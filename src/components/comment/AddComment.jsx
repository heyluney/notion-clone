import { useContext } from 'react';
import { CommentContext } from '../../App';

import { calculateNextKey } from '../../utils/calculate_next_key';

const AddComment = ({ currentComment, updateComment }) => {
    const { comments, changeComments } = useContext(CommentContext);

    return (
        <textarea
            name="postContent"
            value={currentComment}
            onChange={(e) => {
                updateComment(e.target.value);
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
        />
    )
}

export default AddComment;
