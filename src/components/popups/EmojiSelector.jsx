import { useContext, useRef } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext } from '../../App';

import { chunkify } from '../../utils/chunkify';
import { getItem, saveItem } from '../../utils/local_storage';

import { useOutsideEmojiAlerter } from '../../hooks/OutsideAlert';
import { computeEmoji } from '../../utils/compute_emoji';

const EmojiSelector = ({ updateDisplayEmoji }) => {
    const emojiDictionary = getItem('emoji_dictionary');
    const arrayified = Object.entries(emojiDictionary)
                    .map(([category, subs]) => 
                    [
                        category, 
                        Object.entries(subs)
                            .map(([sub, hex]) => [sub, Object.entries(hex)])
                    ]);
    console.log('arrayified', arrayified);        

    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;

    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef, updateDisplayEmoji);

    const createEmojiSelector = (emojiArray, perRow) => {
        const chunked_emojis = chunkify(emojiArray, perRow);
        return chunked_emojis.map((emojis, idx) =>
            <div key={idx} className={styles.row}>
                {emojis.map(([name, hexcode]) =>
                    <div className={styles.emoji}
                        key={name} 
                        onClick={() => {
                        const newPage = {
                            [active]:
                            allPages[active].map((x, idx) => idx == 2 ? hexcode : x)
                        };
                        const newPages = [{ ...allPages, ...newPage }, active];
                        changePages(newPages);
                        saveItem('pages', newPages);
                    }}>
                        {computeEmoji(hexcode)}
                    </div>)}
            </div>)
    }
    return (
        <div className={styles.emojis}
            ref={wrapperRef}>
            <div className={styles.types}></div>
            {arrayified.map(([category, subs]) => <div>
                {category}
                {subs.map(([subcategory, pairs]) => <div>
                    {subcategory}
                    {createEmojiSelector(pairs, 12)}
                </div>)}
            </div>)}
        </div>
    )
}

export default EmojiSelector;