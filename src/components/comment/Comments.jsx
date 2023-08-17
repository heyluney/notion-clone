import { useState } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

const Comments = () => {
    if (localStorage.getItem('quicknote-comments') == null || localStorage.getItem('quicknote-comments') === 'undefined') {
        localStorage.setItem('quicknote-comments', JSON.stringify([]));
    }
    const savedComments = JSON.parse(localStorage.getItem('quicknote-comments'));
    const [comments, addComment] = useState(savedComments);
    const [currentComment, updateComment] = useState("");
    return (
        <div>
            This is comment
            {Object.keys(comments).length == 0 ? "" : comments.map(comment => 
                <div className={styles.comment} key={comment.timestamp}>
                    <img className={styles.pic} src={clark}/>
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <div className={styles.author}>Helen Yu</div>
                            <div className={styles.date}>{getTimeString(comment.timestamp)}</div>
                        </div>
                        <div className={styles.textarea}>{comment.comment}</div>
                    </div>
                </div>
            )}
            <textarea 
                name="postContent" 
                value={currentComment}
                onChange={(e) => {
                    updateComment(e.target.value);
                }}
                onKeyDown={(e) => {
                    console.log('e.key', e.key);
                    if (e.key === 'Enter') {
                        const currentTimestamp = JSON.stringify(new Date());
                        comments.push({timestamp: currentTimestamp, comment: currentComment});
                        addComment(comments);
                        localStorage.setItem('quicknote-comments', JSON.stringify(comments));
                        updateComment("");
                    }
                }}
                />
        </div>
    )
}

export default Comments;