import { useState, useEffect, useContext, useRef, useCallback } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext } from '../../App';

import { chunkify } from '../../utils/chunkify';
import { getItem, saveItem } from '../../utils/local_storage';

import { useOutsideEmojiAlerter } from '../../hooks/OutsideAlert';
import { computeEmoji } from '../../utils/compute_emojis';

import { flattenEmojiDictionary, truncateEmojiDictionary } from '../../utils/compute_emojis';
import { useOnScreen } from '../../hooks/OnscreenAlert';

const EmojiSelector = ({ updateDisplayEmoji }) => {
    // This allows synchronization of emoji update across multiple pages.
    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;

    // Determines whether the emoji popup window is open or closed.
    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef, updateDisplayEmoji);
    const [hoveredEmoji, changeHoveredEmoji] = useState(false);

    // emojiDictionary is an object that contains all the emojis on default, we can reset
    // arrayifiedEmojiDictionary to emojiDictionary after search.
    const [emojiLength, changeEmojiLength] = useState(5000);
    const [prefix, changePrefix] = useState("");

    const [currentCategory, changeCategory] = useState("Smileys & Emotion");

    const emojiDictionary = flattenEmojiDictionary(getItem('emoji_dictionary'));
    const [arrayifiedEmojiDictionary, updateArrayifiedEmojiDictionary] = useState(
        truncateEmojiDictionary(emojiDictionary, "", emojiLength)
    )

    // Stores search term in emoji search bar.
    const [searchTerm, updateSearchTerm] = useState("");

    // Where should the responsibility be for changing the type of emoji be? 
    const createEmojiSelector = (emojiArray, perRow) => {
        return chunkify(emojiArray, perRow).map((emojis, idx) =>
            <div key={idx} className={styles.row}>
                {emojis.map(([name, hexcode, isVisible]) => (
                    isVisible && <div className={styles.emoji}
                        key={name}
                        onClick={(e) => {
                            const newPage = {
                                [active]:
                                    allPages[active].map((x, idx) => idx == 2 ? hexcode : x)
                            };
                            const newPages = [{ ...allPages, ...newPage }, active];
                            changePages(newPages);
                            saveItem('pages', newPages);
                            e.stopPropagation();
                            updateDisplayEmoji(false);
                        }}
                        onMouseOver={() => {
                            changeHoveredEmoji(name)
                        }}>
                        {computeEmoji(hexcode)}
                        {hoveredEmoji === name && <div className={styles.descriptor}>{`:${name}:`}</div>}

                    </div>)
                )}
            </div>);
    }

    const categoryRefs = useRef({});
    const categoryBodyRefs = useRef({});
    const intersectingCategory = useOnScreen(categoryRefs);

    const handleScroll = (e) => {
        if (intersectingCategory != "No intersection exists.") {
            changeCategory(intersectingCategory);
        }
        // const scrollDifference = e.target.scrollHeight - e.target.scrollTop;
        // if (Math.abs(e.target.clientHeight - scrollDifference) < 350) {
        //     changeEmojiLength(2 * emojiLength);
        //     updateArrayifiedEmojiDictionary(
        //         truncateEmojiDictionary(emojiDictionary, "", emojiLength)
        //     )
        // }
    }

    const handleScrollToView = (category) => {
        if (categoryBodyRefs.current[category]) {
            requestAnimationFrame(() => categoryBodyRefs.current[category]
                .scrollIntoView({ block: "start", behavior: "smooth" }));
        }
    }

    const handleCategoryChange = (category) => {
        if (categoryRefs.current[category]) {
            changeCategory(category);
            handleScrollToView(category);
        }
    }

    const categoryRefsCB = useCallback(node => {
        if (node !== null) {
            const category =
                node.innerText.split(' ')
                    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            categoryRefs.current[category] = node;
        }
    }, []);

    const categoryBodyRefsCB = useCallback(node => {
        if (node !== null) {
            const category =
                node.firstElementChild.innerText.split(' ')
                    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');
            categoryBodyRefs.current[category] = node;
        }
    }, []);

    return (
        <div className={styles.emojis} ref={wrapperRef} >
            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <input className={styles.search}
                        onClick={e => e.stopPropagation()}
                        onKeyUp={e => {
                            if (e.target.value === "") {
                                updateArrayifiedEmojiDictionary(truncateEmojiDictionary(emojiDictionary, "", emojiLength));
                            } else {
                                updateArrayifiedEmojiDictionary(truncateEmojiDictionary(arrayifiedEmojiDictionary, e.target.value, -1));
                            }
                            changePrefix(e.target.value);
                        }
                        }
                        value={searchTerm}
                        placeholder="Filter..." />
                </div>
                <div className={styles.categories}>
                    {Object.entries(arrayifiedEmojiDictionary).map(([category, pairs]) =>
                        <div key={category}
                            className={category === currentCategory ? `${styles.emoji} ${styles.active}` : styles.emoji}
                            onClick={() => {
                                updateArrayifiedEmojiDictionary(truncateEmojiDictionary(emojiDictionary, "", emojiLength));
                                changePrefix("");
                                handleCategoryChange(category);
                            }}>
                            {computeEmoji(/*First emoji currently chosen
                                to represent the category of emojis.*/pairs[0][1])}
                        </div>)}
                </div>
            </div>

            <div className={styles.bottom} onScroll={handleScroll}>
                {prefix === "" ? Object.entries(arrayifiedEmojiDictionary).map(([category, _]) =>
                    <div key={category} className={styles.cluster} ref={
                        categoryBodyRefsCB}>

                        <div ref={categoryRefsCB}
                            className={styles.category}>
                            {category}
                        </div>

                        <div className={styles.section}>
                            {createEmojiSelector(
                                arrayifiedEmojiDictionary[category],
                                12)}
                        </div>
                    </div>)
                    :
                    <div>
                        {createEmojiSelector(
                            Object.values(arrayifiedEmojiDictionary).flat().filter((
                                [desc, _, __]) => desc.includes(prefix)), 
                            12
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default EmojiSelector;