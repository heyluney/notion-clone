import { useContext, useState, useRef, useEffect } from 'react';

import styles from './EditComment.module.css'

import { CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';
import { MdCancel as Cancel } from 'react-icons/md'
import { AiFillCheckCircle as Check } from 'react-icons/ai';
const EditComment = ({ idx,
    commentBeingEdited,
    comment,
    changeCommentBeingEdited,
    changeMouseOver }) => {
    const { comments, changeComments } = useContext(CommentContext);

    const [currentComment, changeCurrentComment] = useState(comment);

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
        <div ref={commentRef} className={styles.edit_comment}>
            <textarea 
                readOnly={!commentBeingEdited}
                defaultValue={comment}
                className={commentBeingEdited === idx ? styles.active : styles.textarea}
                onClick={() => {
                    changeCommentBeingEdited(idx);
                }}
                onChange={(e) => {
                    changeCurrentComment(e.target.value)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const newComments = {
                            ...comments,
                            ...{
                                [idx]:
                                {
                                    timestamp: JSON.stringify(Date.now()),
                                    comment: e.target.value,
                                    edited: true
                                }
                            }
                        }
                        changeComments(newComments);
                        saveItem('quicknote-comments', newComments);
                        changeMouseOver(-1);
                        changeCommentBeingEdited(-1);
                    }
                }} />
            {commentBeingEdited === idx &&
                <button className={styles.button}
                    onClick={
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('CLICK DA BUTTON')
                        }}>
                    <Cancel />
                </button>
            }
            {commentBeingEdited === idx &&
                <button className={styles.button} onClick={() => {
                    console.log('check clicked')
                }}>
                    <Check />
                </button>}
        </div>
    )
}

export default EditComment;