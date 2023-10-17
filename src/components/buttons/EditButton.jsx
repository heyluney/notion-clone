import { useState } from 'react';

import styles from './EditButton.module.css';

import { AiFillEdit as Edit } from 'react-icons/ai';

const EditButton = ({idx, commentBeingMousedOver, changeCommentBeingEdited}) => {
    const [isHovered, toggleHover] = useState(false);

    return (
        <div className={styles.edit_button}>

        <button
            className={`${styles.button} 
            ${commentBeingMousedOver === idx ?
                    styles.active
                    : styles.inactive}`}
            onMouseEnter={() => {
                toggleHover(true);
            }}
            onMouseLeave={() => {
                toggleHover(false)
            }}
            onClick={() => {
                // changeTodoBeingEdited(idx)
                changeCommentBeingEdited(idx);
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