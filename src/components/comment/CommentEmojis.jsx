import { useState, useContext } from 'react';
import styles from './CommentEmojis.module.css';

import { PageContext } from '../../App';
import { saveItem } from '../../utils/local_storage';
import { computeEmoji } from '../../data/compute_emojis';
import Icon from '../popups/Icon';

import { removeEmoji } from '../../data/pages_helper_functions';

const CommentEmojis = ({idx, comment}) => {
    const plusIcon = "2795";
    const { pages, changePages, currentPageName } = useContext(PageContext);
    
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
                            const newPages = 
                            removeEmoji(pages, "Quick Note", idx, emoji);
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
                    relatedToComments={true}
                />
            </div>
        </div>
    )
}

export default CommentEmojis;