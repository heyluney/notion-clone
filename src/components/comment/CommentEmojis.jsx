import { useState, useContext } from 'react';
import styles from './CommentEmojis.module.css';

import { PageContext, SlideOutContext } from '../../App';
import { saveItem } from '../../utils/local_storage';
import { computeEmoji } from '../../data/compute_emojis';
import Icon from '../popups/Icon';

import { removeEmojiFromComment,
    removeEmojiFromJournalComment } from '../../data/pages_helper_functions';

const CommentEmojis = ({idx, comment, type}) => {
    const { slideOut } = useContext(SlideOutContext);
    const plusIcon = "2795";
    const { pages, changePages, currentPageName } = useContext(PageContext);
    
    // Need idx of comment and idx of emoji in order 
    // to toggle one description at a time.
    const [descriptor, toggleDescriptor] = useState("-1_-1");

    console.log('type', type)
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
                            switch(type) {
                                case 'journal_comments': 
                                    newPages = removeEmojiFromJournalComment(pages, currentPageName, slideOut, idx, emoji);
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
            <div className={styles.add_emoji}>
                <Icon icon={plusIcon}
                    component={`${"Comment"}_${idx}`}
                    type={type !== undefined ? type : "comments"}
                />
            </div>
        </div>
    )
}

export default CommentEmojis;