import { useContext } from 'react';
import { CommentContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';

import { calculateNextKey } from '../../utils/calculate_next_key';

const AddComment = ({ currentComment, updateComment }) => {
    const { comments, changeComments } = useContext(CommentContext);

    return (
        <div className={styles.new}>
        <img className={styles.pic} src={clark} />
        <textarea
            name="postContent"
            value={currentComment}
            onChange={(e) => {
                updateComment(e.target.value);
            }}
            onClick={() => {
                updateComment("");
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const currentTimestamp = JSON.stringify(new Date());
                    const newIdx = calculateNextKey(comments);
                    comments[newIdx] =
                        { timestamp: currentTimestamp, comment: currentComment, edited: false };
                    changeComments(comments);
                    localStorage.setItem('quicknote-comments', JSON.stringify(comments));
                    updateComment("");
                }
            }}
        ><div className={styles.content}>
        </div></textarea>
        </div>
    )
}

export default AddComment;
