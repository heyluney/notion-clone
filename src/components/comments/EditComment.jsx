import { useContext, useState, useRef } from 'react';

import styles from './EditComment.module.css'

import { PageContext } from '../../App';
import useOutsideCommentAlerter from '../../hooks/OutsideCommentAlert'; 
import { useAutosizeTextArea }
 from '../../hooks/AutosizeTextArea';

import { saveItem } from '../../utils/local_storage';
import { MdCancel as Cancel } from 'react-icons/md'
import { AiFillCheckCircle as Check } from 'react-icons/ai';

import { editComment, editJournalComment } from '../../data/pages_helper_functions';

const EditComment = ({ idx,
    comment,
    changeMouseOver,
    type }) => {

    const { pages, changePages, currentPageName, component, changeComponent } = useContext(PageContext);

    const bigCommentRef = useRef(null);
    useOutsideCommentAlerter(bigCommentRef);

    const textareaRef = useRef(null);
    const [currentComment, editCurrentComment] = useState(comment);

    useAutosizeTextArea(idx, textareaRef, currentComment);
    return (
        <div ref={bigCommentRef} className={styles.edit_comment}>
            <textarea 
            ref={textareaRef}
                readOnly={idx !== component.id}
                defaultValue={comment}
                className={idx === component.id ? 
                    styles.active : styles.textarea}
                onClick={() => {
                    changeComponent({
                        id: idx,
                        type: "edit",
                        popups: {...component.popups}
                    })
                }}
                onKeyDown={(e) => {
                    editCurrentComment(e.target.value);
                    if (e.key === 'Enter') {
                        let newPages;
                        switch(type) {
                            case 'journal_comments': 
                                newPages = editJournalComment(pages, currentPageName,
                                    component.id, idx, e.target.value);
                                break;
                            default: 
                                // Default is to update the comment associated with the page.
                                newPages = editComment(pages, 
                                    currentPageName, e.target.value, idx);
                                break;
                        }
                        changePages(newPages);
                        saveItem('pages', newPages);
                        changeMouseOver(-1);
                        changeComponent({
                            id: null,
                            type: null,
                            popups: {...component.popups}
                        })
                    }
                }} />
            {component.id === idx &&
                <>
                    <button className={styles.button}>
                        <Cancel />
                    </button>
                    <button className={styles.button}>
                        <Check />
                    </button>
                </>
            }
        </div>
    )
}

export default EditComment;