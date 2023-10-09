import { useContext, useState, useRef } from 'react';

import styles from './EditComment.module.css'

import { PageContext } from '../../App';
import useOutsideCommentAlerter from '../../hooks/OutsideCommentAlert'; 
import { useAutosizeTextArea }
 from '../../hooks/AutosizeTextArea';

import { saveItem } from '../../utils/local_storage';
import { MdCancel as Cancel } from 'react-icons/md'
import { AiFillCheckCircle as Check } from 'react-icons/ai';

import { editComment } from '../../data/pages_helper_functions';

const EditComment = ({ idx,
    commentBeingEdited,
    comment,
    changeCommentBeingEdited,
    changeMouseOver }) => {
    const { pages, changePages, currentPageName } = useContext(PageContext);

    const bigCommentRef = useRef(null);
    useOutsideCommentAlerter(bigCommentRef, changeCommentBeingEdited);

    const textareaRef = useRef(null);
    const [currentComment, editCurrentComment] = useState(comment);

    useAutosizeTextArea(idx, textareaRef, currentComment, commentBeingEdited);
    return (
        <div ref={bigCommentRef} className={styles.edit_comment}>
            <textarea 
            ref={textareaRef}
                readOnly={commentBeingEdited === -1}
                defaultValue={comment}
                className={commentBeingEdited === idx ? 
                    styles.active : styles.textarea}
                onClick={() => {
                    changeCommentBeingEdited(idx)
                }}
                onKeyDown={(e) => {
                    editCurrentComment(e.target.value);
                    if (e.key === 'Enter') {
                        const newPages = editComment(pages, 
                            currentPageName, e.target.value, idx);
                        changePages(newPages);
                        saveItem('pages', newPages);
                        changeMouseOver(-1);
                        changeCommentBeingEdited(-1);
                    }
                }} />
            {commentBeingEdited === idx &&
                <button className={styles.button}>
                    <Cancel />
                </button>
            }
            {commentBeingEdited === idx &&
                <button className={styles.button}>
                    <Check />
                </button>}
        </div>
    )
}

export default EditComment;