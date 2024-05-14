import { useState, useContext, useEffect } from 'react';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import { setCaret } from '../../utils/text_editor';

const Title = ({ passedTitle, canEdit, isTruncated }) => {
    const { currentPageId, pages, changePages } = useContext(PageContext);

    const [editable, toggleEditable] = useState(false);
    const [title, updateTitle] = useState("");
    const [caretPos, updateCaretPos] = useState(0);

    useEffect(() => {
        if (canEdit) {
            const el = document.getElementById('editable');
            setCaret(el, caretPos);
        }
    }, [title, caretPos]);

    useEffect(() => updateTitle(
        passedTitle === undefined ? pages[currentPageId] : passedTitle), [passedTitle, currentPageId]);

    return (
        <div className={isTruncated ? styles.truncated_title : styles.title}
            id={canEdit ? "editable" : ""}
            contentEditable={editable}
            onClick={() => {
                toggleEditable(canEdit);
                canEdit && 
                    updateCaretPos(window.getSelection().getRangeAt(0).endOffset);
            }}
            suppressContentEditableWarning="true"
            onInput={(e) => {
                updateTitle(e.currentTarget.innerText);
                
                // Update caret position to be where the user last typed.
                updateCaretPos(window.getSelection().getRangeAt(0).endOffset);
                changePages({
                    ...pages,
                    [currentPageId]: e.currentTarget.innerText
                })
            }}>
            {title}
        </div>
    )
}

export default Title;