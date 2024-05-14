import { useContext, useState } from 'react';
import { PageContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';

import { calculateNextKey } from '../../utils/calculate_next_key';

const AddComment = ({componentType, componentId}) => {
    const { comments, changeComments } = useContext(PageContext);

    const [comment, changeComment] = useState("");

    return (
        <div className={styles.new}>
        <img className={styles.pic} src={clark} alt="clarkie_profile_photo" />
            <textarea
                name="postContent"
                value={comment}
                onChange={(e) => {
                    changeComment(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const newComment = {
                            comment: e.target.value,
                            component_type: componentType,
                            component_id: componentId,
                            timestamp: Date.now(),
                            edited: false
                        }
                        const next_comment_id = calculateNextKey(comments);
                        changeComments(
                            {...comments, [next_comment_id]: newComment}
                        );
                        changeComment("");
                    }
                }}
            />
        </div>
    )
}

export default AddComment;