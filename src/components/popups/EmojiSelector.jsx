import { useState, useContext, useRef, useCallback } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext, CommentContext, PopupContext } from '../../App';

import { chunkify } from '../../utils/chunkify';
import { getItem, saveItem } from '../../utils/local_storage';

import useOutsideAlerter from '../../hooks/OutsideAlert';
import { computeEmoji, getTotalEmojiCount } from '../../utils/compute_emojis';

import { flattenEmojiDictionary, 
        truncateEmojiDictionary, 
        filterEmojiDictionary,
    getRepresentativeEmojis,
    getSkinToneEmoji,
    filterEmojiDictionaryBySkintone,
    getRandomEmoji
    } from '../../utils/compute_emojis';
import { useOnScreen } from '../../hooks/OnscreenAlert';

import { FaShuffle as Shuffle } from 'react-icons/fa6';

const EmojiSelector = ({ idx, relatedToComments }) => {
    // This allows synchronization of emoji update across multiple pages.
    const { pages, changePages } = useContext(PageContext);
    const { comments, changeComments } = useContext(CommentContext);
    const { popup, togglePopup } = useContext(PopupContext);

    const [allPages, active] = pages;

    // Determines whether the emoji popup window is open or closed.
    const wrapperRef = useRef();
    useOutsideAlerter(wrapperRef);

    // Lists which emoji is currently being hovered.
    const [hoveredEmoji, changeHoveredEmoji] = useState([/*isRecent?*/false, /*emoji name*/false]);

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

    const createEmojiSelector = (emojiArray, perRow, isRecent) => {
        return chunkify(emojiArray, perRow).map((emojis, rowIdx) =>
            <div key={rowIdx} className={styles.row}>
                {emojis.map(([name, hexcode, isVisible], columnIdx) => (
                    isVisible && 
                    <div className={`${styles.emoji} ${columnIdx % 12 == 0 ? styles.left :
                                                        columnIdx % 12 == 11 ? styles.right : ""}`}
                        key={name}
                        onClick={(e) => {
                            e.preventDefault();
                            if (relatedToComments) {
                                const newEmojiPair = {[hexcode]: name};
                                const newComments = {
                                    ...comments,
                                    ...{
                                        [idx]:
                                        {
                                            timestamp: comments[idx].timestamp,
                                            comment: comments[idx].comment,
                                            edited: false,
                                            emojis: {...comments[idx].emojis, ...newEmojiPair }
                                        }
                                    }
                                }
                                changeComments(newComments);
                                saveItem('quicknote-comments', newComments);
                                togglePopup(null);
                            } else {
                            const newPage = {
                                [active]:
                                    allPages[active].map((x, idx) => idx == 3 ? hexcode : x)
                                };
                                const newPages = [{ ...allPages, ...newPage }, active];
                                changePages(newPages);
                                saveItem('pages', newPages);
                            
                                const newEmojiDictionary = {
                                    ...emojiDictionary, 
                                    "recent": {
                                        [`${name}`]: hexcode,
                                    ...emojiDictionary['recent'], 
                                    }
                                };
                                changeEmojiDictionary(newEmojiDictionary);
                                saveItem('emoji_dictionary', newEmojiDictionary);
                                togglePopup(null);
                            }
                        }}
                        onMouseOver={() => {
                            changeHoveredEmoji([isRecent, name])
                        }}
                        onMouseLeave={() => {
                            changeHoveredEmoji([false, false])
                        }}>
                        <div className={styles.actual}>
                            {computeEmoji(hexcode)}
                        </div>
                        {
                            hoveredEmoji[0] === isRecent && 
                            hoveredEmoji[1] === name && 
                            <div className={styles.descriptor}>{`:${name}:`}</div>
                        }
                    </div>)
                )}
            </div>);
    }

    const categoryRefs = useRef({});
    const formRef = useRef();
    const intersectingCategory = useOnScreen(categoryRefs);

    const handleScroll = (e) => {
        if (intersectingCategory != "No intersection exists.")
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
                ${popup ? styles.open : styles.closed}`} 
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
                            const {description, hexcode} = getRandomEmoji(emojiDictionary);
                            const newPage = {
                                [active]:
                                    allPages[active].map((x, idx) => idx == 3 ? hexcode : x)
                            };
                            const newPages = [{ ...allPages, ...newPage }, active];
                            changePages(newPages);
                            saveItem('pages', newPages);
                            togglePopup(null);
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
                            {["none", 
                            "light skin tone",
                            "medium-light skin tone", 
                            "medium skin tone",
                            "medium-dark skin tone",
                            "dark skin tone"].map(skintone => 
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
                        className={`${styles.actual} ${category === currentCategory ? styles.active : ""}`}
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
                        {createEmojiSelector(arrayifiedEmojiDictionary['recent'], 12, true)}
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
                            {createEmojiSelector(
                                arrayifiedEmojiDictionary[category],
                                12, false)}
                        </div>
                    </div>)
                    :
                    <div>
                        {createEmojiSelector(
                            Object.entries(arrayifiedEmojiDictionary)
                                .filter(([category, _]) => category !== 'recent')
                                .map(x => x[1])
                                .flat(), 
                            12, false
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default EmojiSelector;