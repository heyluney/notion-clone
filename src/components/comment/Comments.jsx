import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

import { CommentContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import Popup from '../../components/popups/Popup';
import { MdOutlineEmojiEmotions as AddEmoji } from 'react-icons/md';
import { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { computeEmoji } from '../../utils/compute_emojis';
import Icon
 from '../popups/Icon';

const Comments = () => {
    const { comments } = useContext(CommentContext);

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
                                        <div className={styles.buttons}>
                                            <button className={styles.button}
                                                onClick={() => {
                                                changeEdit(idx);
                                            }}>
                                                <Edit /> Edit Comment
                                            </button>
                                            <button className={styles.button}
                                                onClick={() => {
                                                togglePopup(idx);
                                                document.getElementById('overlay').style.display = "block";
                                            }}>
                                                <Delete /> Delete Comment
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

                        <div className={styles.emojis}>
                        
                            {Object.entries(comment.emojis)
                                .map(([emoji, description]) => 
                                <div key={emoji} className={`${styles.emoji} ${styles.active}`}>
                                    {computeEmoji(emoji)} 1
                                    </div>)
                                }
                            <div className={`${styles.emoji} ${styles.opaque}`}>
                                <Icon icon={"1F6A7"} 
                                relatedToComments={true} currentCommentIdx={idx}/>
                            </div>

                        </div>
                      
                        </div>
                    </div>
                )}

                <AddComment
                    currentComment={currentComment}
                    updateComment={updateComment} />

                
                <Popup 
                                            popup={popup} 
                                            togglePopup={togglePopup}
                                            idx={popup} />
            </div>
    )
}

export default Comments;
