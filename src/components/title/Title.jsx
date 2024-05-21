import { useState, useContext, useEffect } from 'react';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import { setCaret, getCaret } from '../../utils/text_editor';

const ReadOnlyTitle = ({ title }) => {
    return (
        <div className={styles.truncated_title}
            onClick={() => console.log('read only!')}>
            {title}
        </div>
    )
}

const EditableTitle = ({ title }) => {
    const { components, changeComponents, activeComponents }
         = useContext(PageContext);

    const [editableTitle, updateEditableTitle] = useState(title);
    const [caretPos, updateCaretPos] = useState(0);

    useEffect(() => {
        console.log('here initially')
        setCaret(document.getElementById('editable'), caretPos);
        console.log('caretPos', caretPos)
        // updateCaretPos(window.getSelection().anchorOffset)
    }, [editableTitle, caretPos]);

    return (
        <div className={styles.truncated_title}
            id="editable"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onClick={
                () => {
                    console.log('but what about here')
                    updateCaretPos(window.getSelection().anchorOffset)
                }
                
            }
            onInput={(e) => {
                updateEditableTitle(e.currentTarget.innerText);
                // Update caret position to be where the user last typed.
                updateCaretPos(window.getSelection().anchorOffset);

                changeComponents({
                    ...components,
                    [activeComponents.page]: {
                        ...components[activeComponents.page],
                        title: e.currentTarget.innerText
                    }
                })
            }}>
            {title}
        </div>
    )
}

const Title = ({ title }) => {
    const [editable, changeEditable] = useState(false);

    return (
        <div onClick={() => changeEditable(true)}>
            {editable ?
                <EditableTitle title={title} />
                : <ReadOnlyTitle title={title} />
            }
        </div>
    )
}


export default Title;