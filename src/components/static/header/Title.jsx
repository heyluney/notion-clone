import { useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { PageContext } from '../../../App';
import styles from './Title.module.css';

import { updateComponent } from '../../../data/database/database_functions';
import { setCaret } from '../../../utils/text_editor';

const ReadOnlyTitle = ({ title }) => {
    return (
        <div
            contentEditable={true}
            suppressContentEditableWarning={true}>
            {title}
        </div>
    )
}

const EditableTitle = ({ title }) => {
    const { components, changeComponents } = useContext(PageContext);

    const location = useLocation();

    const [editableTitle, updateEditableTitle] = useState(title);
    const [caretPos, updateCaretPos] = 
        useState(window.getSelection().anchorOffset);

    // Default behavior of contentEditable div is for caret to be reset to the beginning of the div. This overrides that behavior.
    useEffect(() => {
        setCaret(document.getElementById('editable'), caretPos);
    }, [caretPos]);

    return (
        <div id="editable"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onClick={
                () => {
                    updateCaretPos(window.getSelection().anchorOffset)
                } 
                
            }
            onInput={(e) => {
                updateEditableTitle(e.currentTarget.innerText);

                // Update caret position to be where the user last typed.
                updateCaretPos(window.getSelection().anchorOffset);

                const currentPageId = parseInt(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
            
                const updatedComponents = updateComponent(components, currentPageId, {title: e.currentTarget.innerText});
                changeComponents(updatedComponents);
            }}>
            {editableTitle}
        </div>
    )
}

const Title = ({ title }) => {
    const [editable, changeEditable] = useState(false);

    return (
        <div className={styles.truncated_title}
            onClick={() => changeEditable(true)}>
            {editable ?
                <EditableTitle title={title} />
                : <ReadOnlyTitle title={title} />
            }
        </div>
    )
}


export default Title;