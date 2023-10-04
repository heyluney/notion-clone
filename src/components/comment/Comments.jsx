import { useState, useEffect, useContext, useRef } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

import { CommentContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import CommentEmojis from './CommentEmojis';
import CommentButtons from './CommentButtons';

const Comments = () => {
    const { comments } = useContext(CommentContext);

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    const [commentBeingEdited, changeCommentBeingEdited] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    return (
        <div className={styles.comments}>
            {Object.keys(comments).length == 0 ? "" : Object.entries(comments).map(([idx, comment]) =>
                <div className={styles.comment}
                    key={idx}
                    onMouseEnter={() => {
                        if (commentBeingEdited == -1) changeMouseOver(idx);
                    }}
                >
                    <img className={styles.pic} src={clark} />
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <div className={styles.meta}>
                                <div className={styles.author}>Helen Yu</div>
                                <div className={styles.date}>{`${getTimeString(comment.timestamp)}${comment.edited ? " (edited)" : ""}`}</div>
                            </div>
                        </div>

                        <EditComment
                            idx={idx}
                            comment={comment.comment}
                            commentBeingEdited={commentBeingEdited}
                            changeCommentBeingEdited={changeCommentBeingEdited}
                            changeMouseOver={changeMouseOver}
                             />

                        <CommentEmojis idx={idx} comment={comment}/>
                    </div>
                    <CommentButtons 
                        idx={idx}
                        commentBeingMousedOver={commentBeingMousedOver}
                        changeCommentBeingEdited={changeCommentBeingEdited}
                        commentBeingEdited={commentBeingEdited} />
                </div>
            )}
            <AddComment
                currentComment={currentComment}
                updateComment={updateComment} />
        </div>
    )
}

export default Comments;
