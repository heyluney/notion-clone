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

const EditableTitle = ({ title, editable, changeEditable }) => {
    const { components, changeComponents } = useContext(PageContext);

    const location = useLocation();

    const [editableTitle, updateEditableTitle] = useState(title);
    const [caretPos, updateCaretPos] = 
        useState(window.getSelection().anchorOffset);

    // Default behavior of contentEditable div is for caret to be reset to the beginning of the div. This overrides that behavior.
    useEffect(() => {
        setCaret(document.getElementById('editable'), caretPos);
    }, [caretPos]);

    const titleRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log('titleRef', titleRef, 'e.target', e.target)
            if (titleRef.current && !titleRef.current.contains(e.target)) {
                changeEditable(false);
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

                const currentPageId = parseInt(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
            
                // This is not necessarily true
                // maybe use a useEffect here so when editableTitle is updated, the components are automatically updated 
                const component_id = editable.split('_')[1];
 
                const updatedComponents = 
                    updateComponent(components, component_id, {title: e.currentTarget.innerText});
                changeComponents(updatedComponents);
            }}>
            {editableTitle}
        </div>
    )
}


const Title = ({ id, title }) => {
    const [editable, changeEditable] = useState("");

    return (
        <div className={styles.truncated_title}
            onClick={() => 
                changeEditable(id)
            }>
            {editable === id ?
                <EditableTitle title={title}
                                editable={editable}
                                changeEditable={changeEditable}/> : 
                <ReadOnlyTitle title={title} />
            }
        </div>
    )
}


export default Title;