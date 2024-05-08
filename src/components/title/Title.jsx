import { useState, useContext, useEffect } from 'react';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import { setCaret } from '../../utils/text_editor';

const Title = ({ passedTitle }) => {
    const { currentPageId, pages, changePages } = useContext(PageContext);

    const [editable, toggleEditable] = useState(false);
    const [title, updateTitle] = useState(passedTitle);
    const [caretPos, updateCaretPos] = useState(0);

    // useEffect(() => setCaret(caretPos), [title, caretPos]);
    useEffect(() => updateTitle(passedTitle), [passedTitle]);

    return (
        <div className={styles.title}
            id="editable"
            contentEditable={editable}
            onClick={() => {
                toggleEditable(true);
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