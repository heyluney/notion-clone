import { useState, useEffect, useContext, useRef } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

import { CommentContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import Popup from '../../components/popups/Popup';

import CommentEmojis from './CommentEmojis';
import CommentButtons from './CommentButtons';

const Comments = () => {
    const { comments } = useContext(CommentContext);

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    const [commentBeingEdited, changeCommentBeingEdited] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    const [popup, togglePopup] = useState(-1);

    const commentRef = useRef();

    const useOutsideCommentAlerter = (ref, toggleComment) => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleComment(-1);
            }
        }
    
        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideCommentAlerter(commentRef, changeCommentBeingEdited);
    return (
        <div className={styles.comments}>
            {Object.keys(comments).length == 0 ? "" : Object.entries(comments).map(([idx, comment]) =>
                <div className={styles.comment}
                    ref={commentRef}
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
                            changeMouseOver={changeMouseOver} />

                        <CommentEmojis idx={idx} comment={comment}/>
                    </div>
                    <CommentButtons 
                        idx={idx}
                        commentBeingMousedOver={commentBeingMousedOver}
                        changeCommentBeingEdited={changeCommentBeingEdited}
                        togglePopup={togglePopup}/>
                </div>
            )}
            <AddComment
                currentComment={currentComment}
                updateComment={updateComment} />

            <Popup idx={popup}
                popup={popup}
                togglePopup={togglePopup} />
        </div>
    )
}

export default Comments;
