import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

import { CommentContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import Popup from '../../components/popups/Popup';

const Comments = () => {
    const { comments, _} = useContext(CommentContext);

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    const [commentBeingEdited, changeEdit] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    const [popup, togglePopup] = useState(-1);
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
                                {
                                    idx == !commentBeingMousedOver ?
                                        null :
                                        <div>
                                            <button onClick={() => {
                                                changeEdit(idx);
                                            }}>Edit</button>
                                            <button onClick={() => {
                                                togglePopup(idx);
                                                document.getElementById('overlay').style.display = "block";
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                }
                            </div>

                            <EditComment
                                idx={idx}
                                comment={comment.comment}
                                readOnly={!(idx == commentBeingEdited)}
                                changeEdit={changeEdit}
                                changeMouseOver={changeMouseOver} />
                        </div>
                    </div>
                )}

                <AddComment
                    currentComment={currentComment}
                    updateComment={updateComment} />
                <div id="overlay"></div>

                
                {popup == -1 ? null : <Popup 
                                            popup={popup} 
                                            togglePopup={togglePopup}
                                            idx={popup} />}
            </div>
    )
}

export default Comments;
