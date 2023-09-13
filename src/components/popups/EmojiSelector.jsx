import { useState, useEffect, useContext, useRef, useCallback } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext } from '../../App';

import { chunkify } from '../../utils/chunkify';
import { getItem, saveItem } from '../../utils/local_storage';

import { useOutsideEmojiAlerter } from '../../hooks/OutsideAlert';
import { computeEmoji } from '../../utils/compute_emojis';

import { flattenEmojiDictionary, truncateEmojiDictionary } from '../../utils/compute_emojis';
import { useOnScreen } from '../../hooks/OnscreenAlert';

import { FaShuffle as Shuffle } from 'react-icons/fa6';

const EmojiSelector = ({ updateDisplayEmoji }) => {
    // This allows synchronization of emoji update across multiple pages.
    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;

    // Determines whether the emoji popup window is open or closed.
    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef, updateDisplayEmoji);

    // Lists which emoji is currently being hovered.
    const [hoveredEmoji, changeHoveredEmoji] = useState([/*isRecent?*/false, /*emoji name*/false]);

    // Emoji being stored, and the three factors which update visual configuration.
    const [emojiDictionary, changeEmojiDictionary] = useState(getItem('emoji_dictionary'));
    const [emojiLength, changeEmojiLength] = useState(100);
    const [prefix, changePrefix] = useState("");
    const [currentCategory, changeCategory] = useState("Smileys & Emotion");

    const arrayifiedEmojiDictionary = truncateEmojiDictionary(flattenEmojiDictionary(emojiDictionary), prefix, emojiLength);
    const createEmojiSelector = (emojiArray, perRow, isRecent) => {
        return chunkify(emojiArray, perRow).map((emojis, idx) =>
            <div key={idx} className={styles.row}>
                {emojis.map(([name, hexcode, isVisible]) => (
                    isVisible && <div className={styles.emoji}
                        key={name}
                        onClick={(e) => {
                            e.preventDefault();
                            const newPage = {
                                [active]:
                                    allPages[active].map((x, idx) => idx == 2 ? hexcode : x)
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
                            updateDisplayEmoji(false);
                        }}
                        onMouseOver={() => {
                            changeHoveredEmoji([isRecent, name])
                        }}
                        onMouseLeave={() => {
                            changeHoveredEmoji([false, false])
                        }}>
                        {computeEmoji(hexcode)}
                        {hoveredEmoji[0] === isRecent && 
                        hoveredEmoji[1] === name && <div className={styles.descriptor}>{`:${name}:`}</div>}

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
        if (Math.abs(e.target.clientHeight - scrollDifference) < 250) {
            changeEmojiLength(2*emojiLength);
        }
    }

    const handleCategoryChange = (category) => {
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
        <div className={styles.emojis} ref={wrapperRef} >
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <input className={styles.search}
                        ref={formRef}
                        onClick={e => e.stopPropagation()}
                        onKeyUp={e => changePrefix(e.target.value)}
                        placeholder="Filter..." />
                    <div className={styles.button}>
                        <Shuffle/>
                    </div>
                    <div className={styles.button}>
                        {computeEmoji(emojiDictionary['People & Body']['hand-fingers-open']['hand with fingers splayed'])}
                    </div>
                </div>

                <div className={styles.category}>
                    Categories
                </div>
                <div className={styles.categories}>
                    {Object.entries(arrayifiedEmojiDictionary)
                        .filter(([category, _]) => category !== 'recent')
                        .map(([category, pairs]) =>
                        <div key={category}
                            className={category === currentCategory ? `${styles.emoji} ${styles.active}` : styles.emoji}
                            onClick={() => {
                                changeEmojiLength(5000);
                                changePrefix("");
                                formRef.current.value = "";
                                handleCategoryChange(category);
                            }}>
                            {computeEmoji(/*First emoji currently chosen
                                to represent the category of emojis.*/pairs[0][1])}
                        </div>)}
                </div>
            </div>

            <div className={styles.bottom} onScroll={handleScroll}>
                <div key="recent" className={styles.cluster}>
                    <div className={styles.category}>Recently Used</div>
                    <div className={styles.section}>
                        {createEmojiSelector(arrayifiedEmojiDictionary['recent'], 12, true)}
                    </div>
                </div>

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
                            Object.values(arrayifiedEmojiDictionary).flat().filter((
                                [desc, _, __]) => desc.includes(prefix)), 
                            12, false
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default EmojiSelector;