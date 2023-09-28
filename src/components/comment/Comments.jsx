import { useState, useContext } from 'react';
import { saveItem } from '../../utils/local_storage';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';

import { CommentContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import Popup from '../../components/popups/Popup';
import { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai';
import { computeEmoji } from '../../utils/compute_emojis';
import Icon
    from '../popups/Icon';

const Comments = () => {
    const { comments, changeComments } = useContext(CommentContext);

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    const [commentBeingEdited, changeEdit] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    const [popup, togglePopup] = useState(-1);
    const [emojiPopup, toggleEmojiPopup] = useState(-1);
    // Need idx of comment and idx of emoji in order to toggle one description at a time.
    const [descriptor, toggleDescriptor] = useState("-1_-1");

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
                            {idx == !commentBeingMousedOver ?
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
                                </div>}
                        </div>

                        <EditComment
                            idx={idx}
                            comment={comment.comment}
                            readOnly={!(idx == commentBeingEdited)}
                            changeEdit={changeEdit}
                            changeMouseOver={changeMouseOver} />

                        <div className={styles.emojis}>

                            {Object.entries(comment.emojis)
                                .map(([emoji, description], emoji_idx) =>
                                    <div 
                                        key={emoji} className={`${styles.emoji} ${styles.active}`}
                                        onMouseEnter={() => {
                                            toggleDescriptor(`${idx}_${emoji_idx}`)
                                        }}
                                        onMouseLeave={() => {
                                            toggleDescriptor("-1_-1")
                                        }}
                                        onClick={() => {
                                            const newComments = {...comments};
                                            delete newComments[idx]['emojis'][emoji];
                                            changeComments(newComments);
                                            saveItem('quicknote-comments', newComments);
                                        }}
                                        >
                                        {computeEmoji(emoji)} 1
                                        {descriptor === `${idx}_${emoji_idx}` && <div className={styles.descriptor}>{`:${description}:`}</div>}
                                    </div>)
                            }
                            <div className={styles.add_emoji}>
                                <Icon icon={"1F6A7"}
                                    idx={idx}
                                    relatedToComments={true}
                                    emojiPopup={emojiPopup}
                                    toggleEmojiPopup={toggleEmojiPopup}
                                />
                            </div>
                        </div>
                    </div>
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
