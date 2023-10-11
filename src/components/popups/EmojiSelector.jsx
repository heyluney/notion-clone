import { useState, useContext } from 'react';

import styles from './EmojiSelector.module.css';


import { chunkify } from '../../utils/chunkify';
import { addEmojiToComment, 
        updateTitleEmoji, 
        editJournalEmoji,
        addEmojiToJournalComment } from '../../data/pages_helper_functions';
import { PageContext, PopupContext, SlideOutContext } from '../../App';
import { computeEmoji, addEmojiToRecent } from '../../data/compute_emojis';

import { saveItem } from '../../utils/local_storage';

const EmojiSelector = ({
        component, 
        type, 
        changeEmojiDictionary, 
        emojiDictionary,
        emojiArray, 
        isRecent}) => {
    const { togglePopup } = useContext(PopupContext);
    const { slideOut } = useContext(SlideOutContext);

    // Lists which emoji is currently being hovered.
    const [hoveredEmoji, changeHoveredEmoji] = useState([/*isRecent?*/false, /*emoji name*/false]);

    const { pages, changePages, currentPageName } = useContext(PageContext);

    return chunkify(emojiArray, 12).map((emojis, rowIdx) =>
        <div key={rowIdx} className={styles.row}>
            {emojis.map(([name, hexcode, isVisible], columnIdx) => (
                isVisible && 
                <div className={`${styles.emoji} ${columnIdx % 12 == 0 ? styles.left :
                                                    columnIdx % 12 == 11 ? styles.right : ""}`}
                    key={name}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const idx = parseInt(component.split('_')[1]);
                        
                        const newEmojiDict = addEmojiToRecent(emojiDictionary, {[name]: hexcode});
                        changeEmojiDictionary(newEmojiDict);
                        saveItem('emoji_dictionary', newEmojiDict);

                        // Depending on the context the emoji selector is used, have different
                        // updating logic.
                        let newPages;
                        switch(type) {
                            case 'comments': 
                                newPages = addEmojiToComment(pages, currentPageName, idx, {[hexcode]: name});
                                break;
                            case 'journal': 
                                newPages = editJournalEmoji(pages, currentPageName, slideOut, hexcode);
                                break;
                            case 'journal_comments':
                                const commentIdx = parseInt(component.split('_')[1]);
                                newPages = addEmojiToJournalComment(pages, currentPageName, slideOut, commentIdx, {[hexcode]: name});
                                break;
                            default: 
                                // Default is to update the emoji associated with the page.
                                newPages = updateTitleEmoji(pages, currentPageName, hexcode);
                                break;
                        }
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