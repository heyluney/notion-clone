import { useEffect, useState, useContext, useRef } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext } from '../../App';

import { chunkify } from '../../utils/chunkify';
import { getItem, saveItem } from '../../utils/local_storage';

import { useOutsideEmojiAlerter } from '../../hooks/OutsideAlert';
import { computeEmoji } from '../../utils/compute_emojis';

import { flattenEmojiDictionary, truncateEmojiDictionary, calculateAccumulatingLengths } from '../../utils/compute_emojis';
import { useOnScreen } from '../../hooks/OnscreenAlert';

const EmojiSelector = ({ updateDisplayEmoji }) => {
    const DEFAULT_EMOJI_LENGTH = 100;
    const [emojiLength, changeEmojiLength] = useState(DEFAULT_EMOJI_LENGTH);

    const [emojiDictionary, changeEmojiDictionary] = useState(truncateEmojiDictionary
                    (flattenEmojiDictionary(getItem('emoji_dictionary')), 
                            emojiLength));

    const accumulatingLengths = calculateAccumulatingLengths(emojiDictionary);

    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;

    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef, updateDisplayEmoji);

    const createEmojiSelector = (emojiArray, perRow) => {
        return chunkify(emojiArray, perRow).map((emojis, idx) =>
            <div key={idx} className={styles.row}>
                {emojis.map(([name, hexcode, isVisible]) => (
                    isVisible && <div className={styles.emoji}
                        key={name}
                        onClick={() => {
                            const newPage = {
                                [active]:
                                    allPages[active].map((x, idx) => idx == 2 ? hexcode : x)
                            };
                            const newPages = [{ ...allPages, ...newPage }, active];
                            changePages(newPages);
                            saveItem('pages', newPages);
                            updateDisplayEmoji(false);
                        }}>
                        {computeEmoji(hexcode)}
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
        const scrollDifference = e.target.scrollHeight - e.target.scrollTop;
        if (Math.abs(e.target.clientHeight - scrollDifference) < 350) {
            changeEmojiLength(2*emojiLength);
            changeEmojiDictionary(truncateEmojiDictionary(emojiDictionary, emojiLength));
            console.log('emojiDictionary inside scrolling', emojiDictionary);
        }
    }

    const handleCategoryChange = (category) => {
        changeCategory(category);
        changeEmojiDictionary(truncateEmojiDictionary(emojiDictionary, accumulatingLengths[category]));
    }

    const handleScrollToView = (category) => {
        categoryBodyRefs.current[category].scrollIntoView();
    }

    const [currentCategory, changeCategory] = useState("Smileys & Emotion");
    return (
        <div className={styles.emojis}
            ref={wrapperRef} >

            <div className={styles.top}>
                <div className={styles.wrapper}>
                    <input className={styles.search} placeholder="Filter..." />
                </div>
                <div className={styles.categories}>
                    {Object.entries(emojiDictionary).map(([category, pairs]) =>
                    <div key={category}
                        className={category === currentCategory ? `${styles.emoji} ${styles.active}` : styles.emoji}
                        onClick={() => {
                            handleCategoryChange(category);
                            handleScrollToView(category);
                        }}>
                            {computeEmoji(pairs[0][1])}
                    </div>)}
                </div>
            </div>

            <div className={styles.bottom} onScroll={handleScroll}>
                {Object.entries(emojiDictionary).map(([category, _]) => 
                <div key={category} ref={el => categoryBodyRefs.current[category] = el}>
                    <div ref={el => categoryRefs.current[category] = el}
                        className={styles.category}
                    >
                        {category}
                    </div>
                    <div className={styles.section}>
                        {createEmojiSelector(emojiDictionary[category], 12)}
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default EmojiSelector;