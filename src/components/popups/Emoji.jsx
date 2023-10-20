import { useState, useContext, useRef, useCallback } from 'react';

import styles from './Emoji.module.css';
import { PageContext } from '../../App';

import { getItem, saveItem } from '../../utils/local_storage';

import { skintones } from '../../data/populate_emoji_dictionary';
import { useOutsideEmojiAlerter } from '../../hooks/OutsideEmojiAlert';
import { computeEmoji, getTotalEmojiCount } from '../../data/compute_emojis';

import { flattenEmojiDictionary, 
        truncateEmojiDictionary, 
        filterEmojiDictionary,
    getRepresentativeEmojis,
    getSkinToneEmoji,
    filterEmojiDictionaryBySkintone,
    getRandomEmoji
    } from '../../data/compute_emojis';
import useOnScreen from '../../hooks/OnscreenAlert';

import EmojiSelector from './EmojiSelector';

import { addEmojiToComment, 
        editJournalEmoji, 
        addEmojiToJournalComment, 
        updateTitleEmoji,
        addTodoEmoji } from '../../data/pages_helper_functions';

import { FaShuffle as Shuffle } from 'react-icons/fa6';

const Emoji = () => {
    // This allows synchronization of emoji update across multiple pages.
    const { pages, changePages, currentPageName, component, changeComponent } = useContext(PageContext);
    const { id, type } = component;


    // Determines whether the emoji popup window is open or closed.
    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef);


    // Emoji being stored, and the three factors which update visual configuration.
    const [emojiDictionary, changeEmojiDictionary] = useState(getItem('emoji_dictionary'));
    const [emojiLength, changeEmojiLength] = useState(100);
    const [prefix, changePrefix] = useState("");
    const [skintone, changeSkintone] = useState(getItem('emoji_dictionary_skintone'));
    const [skintonePopup, toggleSkintonePopup] = useState(false);
    const [currentCategory, changeCategory] = useState("Smileys & Emotion");

    let arrayifiedEmojiDictionary = truncateEmojiDictionary(
        flattenEmojiDictionary(
            filterEmojiDictionary(
                filterEmojiDictionaryBySkintone(emojiDictionary, skintone), 
                prefix)
        ), 
        prefix, 
        emojiLength);

    const categoryRefs = useRef({});
    const formRef = useRef();
    const intersectingCategory = useOnScreen(categoryRefs);

    const handleScroll = (e) => {
        if (intersectingCategory !== "No intersection exists.")
            changeCategory(intersectingCategory);
        const scrollDifference = e.target.scrollHeight - e.target.scrollTop;
        if (Math.abs(e.target.clientHeight - scrollDifference) < 400) {
            changeEmojiLength(2*emojiLength);
        }
    }

    const handleCategoryChange = (category) => {
        changeEmojiLength(getTotalEmojiCount(emojiDictionary));
        changeCategory(category);
        requestAnimationFrame(() => categoryRefs.current[category]
            .scrollIntoView({ block: "start", behavior: "smooth" }));
    }

    const categoryRefsCB = useCallback(node => {
        if (node !== null) {
            const category =
                node.innerText.split(' ')
                    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            categoryRefs.current[category] = node;
        }
    }, []);

    return (
        <div 
            className={`${styles.emojis} 
                ${id !== null ? styles.open : styles.closed}`} 
            ref={wrapperRef}>
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <input className={styles.search}
                        ref={formRef}
                        onClick={e => e.stopPropagation()}
                        onKeyUp={e => changePrefix(e.target.value)}
                        placeholder="Filter..." 
                        autoFocus={true} />
                    <div className={styles.button}
                        onClick={() => {
                            const {description: name, hexcode} = getRandomEmoji(emojiDictionary);
                            let newPages;
                            const idx = parseInt(component.split('_')[1]);

                            switch(type) {
                                case 'comments': 
                                    newPages = addEmojiToComment(pages, currentPageName, idx, {[hexcode]: name});
                                    break;
                                case 'journal': 
                                    newPages = editJournalEmoji(pages, currentPageName, id, hexcode);
                                    break;
                                case 'journal_comments':
                                    const commentIdx = parseInt(component.split('_')[1]);
                                    newPages = addEmojiToJournalComment(pages, currentPageName, id, commentIdx, {[hexcode]: name});
                                    break;
                                case 'add_todo': 
                                    newPages = addTodoEmoji(pages, currentPageName, id, hexcode);
                                    break;
                                default: 
                                    // Default is to update the emoji associated with the page.
                                    newPages = updateTitleEmoji(pages, currentPageName, hexcode);
                                    break;
                            }
                            changePages(newPages);
                            saveItem('pages', newPages);
                            changeComponent({
                                id: component.id,
                                type: component.type,
                                popups: {
                                    ...component.popups,
                                    emoji: false
                                }
                            })
                        }}>
                        <Shuffle/>
                    </div>
                    <div className={styles.button} onClick={(e) => {
                        e.stopPropagation();
                        toggleSkintonePopup(!skintonePopup);
                    }}>
                        <div>
                        {computeEmoji(getSkinToneEmoji(emojiDictionary, skintone))}
                        </div>
                        {skintonePopup && 
                        <div className={styles.skintone_popup}>
                            {skintones.map(skintone => 
                            <div key={skintone} onClick={() => {
                                changeSkintone(skintone);
                                saveItem('emoji_dictionary_skintone', skintone);
                            }}>
                                {computeEmoji(getSkinToneEmoji(emojiDictionary, skintone))}
                            </div>)}
                        
                        </div>}
                    </div>
                </div>

                <div className={styles.category}>
                    Categories
                </div>
                <div className={styles.categories}>
                    {getRepresentativeEmojis(emojiDictionary).map(
                        ([category, representativeEmoji]) => 
                        <div key={category}
                            className={`${styles.actual} ${category === 
                                    currentCategory ? styles.active : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                changeEmojiLength(getTotalEmojiCount());
                                changePrefix("");
                                formRef.current.value = "";
                                handleCategoryChange(category);
                            }}>
                        {computeEmoji(representativeEmoji)}
                    </div>)}
                </div>
            </div>

            <div className={styles.bottom} onScroll={handleScroll}>
                {prefix === "" && <div key="recent" className={styles.cluster}>
                    <div className={styles.category}>Recently Used</div>
                    <div className={styles.section}>

                        <EmojiSelector 
                            emojiArray={arrayifiedEmojiDictionary['recent']}
                            isRecent={true}
                            type={type}
                            emojiDictionary={emojiDictionary}
                            changeEmojiDictionary={changeEmojiDictionary}
                            component={component}
                            />
                    </div>
                </div>}

                {prefix === "" ? Object.entries(arrayifiedEmojiDictionary)
                    .filter(([category, _]) => category !== 'recent')
                    .map(([category, _]) =>
                    <div key={category} className={styles.cluster}>

                        <div ref={categoryRefsCB}
                            className={styles.category}>
                            {category}
                        </div>

                        <div className={styles.section}>
                            
                        <EmojiSelector 
                            emojiArray={arrayifiedEmojiDictionary[category]}
                            isRecent={false}
                            type={type}
                            emojiDictionary={emojiDictionary}
                            changeEmojiDictionary={changeEmojiDictionary}
                            component={component}
                            />
                        </div>
                    </div>)
                    :
                    <div>
                        <EmojiSelector 
                            emojiArray={Object.entries(arrayifiedEmojiDictionary)
                                .filter(([category, _]) => category !== 'recent')
                                .map(x => x[1])
                                .flat()}
                            isRecent={false}
                            type={type}
                            emojiDictionary={emojiDictionary}
                            changeEmojiDictionary={changeEmojiDictionary}
                            component={component}
                            />
                    </div>
                }
            </div>
        </div>
    )
}

export default Emoji;