import { useContext, useState } from 'react';

import styles from './DeleteButton.module.css';

import { PopupContext } from '../../App';

import { AiFillDelete as Delete } from 'react-icons/ai';


const DeleteButton = ({idx, commentBeingMousedOver}) => {
    const { togglePopup } = useContext(PopupContext);

    const [isHovered, toggleHover] = useState(false);
    return (
        <div className={styles.delete_button}>
            <button
                className={`${styles.button} ${commentBeingMousedOver === idx ?
                    styles.active :
                    styles.inactive}`}
                onClick={() => {
                    togglePopup(`Delete_${idx}`);
                }}
                onMouseEnter={() => {
                    toggleHover(true);
                }}
                onMouseLeave={() => {
                    toggleHover(false)
                }}
                >
                <Delete />
            </button>
                {isHovered && 
                    <div className={styles.descriptor}>
                        Delete
                    </div>
                }
        </div>
    )
}

export default DeleteButton;