import { useState, useContext } from 'react';
import styles from './CommentEmojis.module.css';

import { CommentContext } from '../../App';
import { saveItem } from '../../utils/local_storage';

import { computeEmoji } from '../../utils/compute_emojis';
import Icon
    from '../popups/Icon';


const CommentEmojis = ({idx, comment}) => {
    const { comments, changeComments } = useContext(CommentContext);

    const [emojiPopup, toggleEmojiPopup] = useState(-1);
    // Need idx of comment and idx of emoji in order to toggle one description at a time.
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
                            const newComments = { ...comments };
                            delete newComments[idx]['emojis'][emoji];
                            changeComments(newComments);
                            saveItem('quicknote-comments', newComments);
                        }}
                    >
                        {computeEmoji(emoji)} 1
                        {descriptor === `${idx}_${emoji_idx}` && <div className={styles.descriptor}>{`:${description}:`}</div>}
                    </div>)
            }
            <div className={styles.add_emoji}>
                <Icon icon={"1F6A7"}
                    idx={idx}
                    relatedToComments={true}
                    emojiPopup={emojiPopup}
                    toggleEmojiPopup={toggleEmojiPopup}
                />
            </div>
        </div>
    )
}

export default CommentEmojis;