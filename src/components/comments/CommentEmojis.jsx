import { useState, useContext } from 'react';
import styles from './CommentEmojis.module.css';

import { PageContext } from '../../App';
import { saveItem } from '../../utils/local_storage';
import { computeEmoji } from '../../data/compute_emojis';
import Icon from '../popups/Icon';

import { removeEmojiFromComment,
    removeEmojiFromJournalComment } from '../../data/pages_helper_functions';

const CommentEmojis = ({idx, comment}) => {
    const plusIcon = "2795";
    const { pages, changePages, currentPageName, 
        component, changeComponent } = useContext(PageContext);

    // Need idx of comment and idx of emoji in order 
    // to toggle one description at a time.
    const [descriptor, toggleDescriptor] = useState("-1_-1");
    return (
        <div className={styles.emojis}>
            {comment.emojis && Object.entries(comment.emojis)
                .map(([emoji, description], emoji_idx) =>
                    <div
                        key={emoji} className={`${styles.emoji} ${styles.active}`}
                        onMouseEnter={() => {
                            toggleDescriptor(`${idx}_${emoji_idx}`)
                        }}
                        onMouseLeave={() => {
                            toggleDescriptor("-1_-1")
                        }}
                        onClick={() => {

                            let newPages;
                            switch(component.type) {
                                case 'journal_comments': 
                                    newPages = removeEmojiFromJournalComment(pages, currentPageName, component.id, idx, emoji);
                                    break;
                                default: 
                                    // Default is to remove the emoji from page-level comments.
                                    newPages = removeEmojiFromComment(pages, currentPageName, idx, emoji)
                                    break;
                            }
                            changePages(newPages);
                            saveItem('pages', newPages);
                        }}
                    >
                        {computeEmoji(emoji)} 1
                        {descriptor === `${idx}_${emoji_idx}` && <div className={styles.descriptor}>{`:${description}:`}</div>}
                    </div>)
            }
            <div className={styles.add_emoji} 
                onClick={() => {
                    changeComponent({
                        id: component.id === null ? idx : null,
                        type: component.type === null ? "comment": null,
                        popups: {
                            ...component.popups,
                            "emoji": !component.popups.emoji
                        }
                    })
                }}>
                <Icon icon={plusIcon}
                    value={`${"comment"}_${idx}`}
                />
            </div>
        </div>
    )
}

export default CommentEmojis;