import { useContext } from 'react';
import { CommentContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';

import { calculateNextKey } from '../../utils/calculate_next_key';
import { saveItem } from '../../utils/local_storage';


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
                    const newComments = {
                        ...comments,
                        [calculateNextKey(comments)]: {
                            timestamp: JSON.stringify(new Date()),
                            comment: currentComment,
                            edited: false
                        }
                    }
                    changeComments(newComments);
                    saveItem('quicknote-comments', newComments);
                    updateComment("");
                }
            }}
        ><div className={styles.content}>
        </div></textarea>
        </div>
    )
}

export default AddComment;
