import { useState, useContext } from 'react';

import styles from './EditButton.module.css';

import { PageContext } from '../../App';


import { AiFillEdit as Edit } from 'react-icons/ai';

const EditButton = ({idx, itemBeingMousedOver, type, textAreaRef}) => {
    const [isHovered, toggleHover] = useState(false);

    const { component, changeComponent } = useContext(PageContext);

    return (
        <div className={styles.edit_button}>

        <button
            className={`${styles.button} 
            ${itemBeingMousedOver === idx ?
                    styles.active
                    : styles.inactive}`}
            onMouseEnter={() => {
                toggleHover(true);
            }}
            onMouseLeave={() => {
                toggleHover(false)
            }}
            onClick={() => {
                changeComponent({
                    id: idx,
                    type: type,
                    popups: {
                        ...component.popups
                    }
                })
                if (textAreaRef.current) {
                    textAreaRef.current.focus();

                    // Updates the cursor to be focused at the last character in the text area.
                    textAreaRef.current.setSelectionRange(
                        textAreaRef.current.value.length, textAreaRef.current.value.length
                    )
                }
                
            }}>
            <Edit />
        </button>
            {isHovered && 
                <div className={styles.descriptor}>
                    Edit
                </div>
            }
        </div>
    )
}

export default EditButton;