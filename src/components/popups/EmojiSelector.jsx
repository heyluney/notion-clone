import { useState, useContext } from 'react';

import styles from './EmojiSelector.module.css';


import { chunkify } from '../../utils/chunkify';
import { addEmoji, updateEmoji } from '../../data/pages_helper_functions';
import { PageContext, PopupContext } from '../../App';
import { computeEmoji, addEmojiToRecent } from '../../data/compute_emojis';

import { saveItem } from '../../utils/local_storage';

const EmojiSelector = ({
        component, relatedToComments, changeEmojiDictionary, emojiDictionary,
        emojiArray, perRow, isRecent}) => {
    const { togglePopup } = useContext(PopupContext);

    // Lists which emoji is currently being hovered.
    const [hoveredEmoji, changeHoveredEmoji] = useState([/*isRecent?*/false, /*emoji name*/false]);

    const { pages, changePages, currentPageName } = useContext(PageContext);

    return chunkify(emojiArray, perRow).map((emojis, rowIdx) =>
        <div key={rowIdx} className={styles.row}>
            {emojis.map(([name, hexcode, isVisible], columnIdx) => (
                isVisible && 
                <div className={`${styles.emoji} ${columnIdx % 12 == 0 ? styles.left :
                                                    columnIdx % 12 == 11 ? styles.right : ""}`}
                    key={name}
                    onClick={(e) => {
                        e.preventDefault();
                        const idx = parseInt(component.split('_')[1]);
                        
                        const newEmojiDict = addEmojiToRecent(emojiDictionary, {[name]: hexcode});
                        changeEmojiDictionary(newEmojiDict);
                        saveItem('emoji_dictionary', newEmojiDict);

                        // Depending on the context the emoji selector is used, have different
                        // updating logic.
                        const newPages = 
                            relatedToComments ? 
                                addEmoji(pages, currentPageName, idx, {[hexcode]: name}) :
                                updateEmoji(pages, currentPageName, hexcode);
                        changePages(newPages);
                        saveItem('pages', newPages);
                        togglePopup(null);
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

export default EmojiSelector;