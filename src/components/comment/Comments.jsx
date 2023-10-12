import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import { getTimeString } from '../../utils/calculate_date';

import { PageContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import CommentEmojis from './CommentEmojis';
import CommentButtons from './CommentButtons';

const Comments = ({passedComments, type}) => {
    const { pages, currentPageName } = useContext(PageContext);
    const comments = 
        passedComments === undefined ? pages[currentPageName].comments : passedComments;

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    const [commentBeingEdited, changeCommentBeingEdited] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
            Object.entries(comments).map(([idx, comment]) =>
                <div className={styles.comment}
                    key={idx}
                    onMouseEnter={() => {
                        if (commentBeingEdited === -1) 
                        changeMouseOver(idx);
                    }}
                >
                    <img className={styles.pic} src={clark} alt="clark_profile" />
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
                            type={type}/>

                        <CommentEmojis idx={idx} comment={comment} type={type}/>
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
                updateComment={updateComment}
                type={type}/>
        </div>
    )
}

export default Comments;
