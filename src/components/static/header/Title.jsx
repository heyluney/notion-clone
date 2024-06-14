import { useLocation } from 'react-router-dom';
import { useState, useContext, useEffect, useRef } from 'react';
import { PageContext } from '../../../App';
import styles from './Title.module.css';

import { updateComponent } from '../../../data/database/database_functions';
import { setCaret } from '../../../utils/text_editor';

const ReadOnlyTitle = ({ title }) => {
    return (
        <div>
            {title}
        </div>
    )
}

const EditableTitle = ({ title, editableId, changeEditableId }) => {
    const { components, changeComponents } = useContext(PageContext);

    const [editableTitle, updateEditableTitle] = useState(title);
    const [caretPos, updateCaretPos] = 
        useState(window.getSelection().anchorOffset);

    // Default behavior of contentEditable div is for caret to be reset to the beginning of the div. This overrides that behavior.
    useEffect(() => {
        setCaret(document.getElementById('editable'), caretPos);
    }, [caretPos]);

    // Updates the 
    const titleRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (titleRef.current && !titleRef.current.contains(e.target)) {
                changeEditableId(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    }, [titleRef])

    return (
        <div id="editable"
            ref={titleRef}
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
            
                // editableId is the unique identifier of the component that is currently being updated.
                const component_id = editableId.split('_')[1];
 
                const updatedComponents = 
                    updateComponent(components, component_id, {title: e.currentTarget.innerText});
                changeComponents(updatedComponents);
            }}>
            {editableTitle}
        </div>
    )
}


const Title = ({ id, title }) => {
    const [editableId, changeEditableId] = useState(null);

    return (
        <div className={styles.truncated_title}
            onClick={() => 
                changeEditableId(id)
            }>
            {editableId === id ?
                <EditableTitle title={title}
                                editableId={editableId}
                                changeEditableId={changeEditableId}/> : 
                <ReadOnlyTitle title={title} />
            }
        </div>
    )
}


export default Title;