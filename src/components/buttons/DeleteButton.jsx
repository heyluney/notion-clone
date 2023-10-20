import { useContext, useState } from 'react';

import styles from './DeleteButton.module.css';

import { PageContext } from '../../App';

import { AiFillDelete as Delete } from 'react-icons/ai';


const DeleteButton = ({idx, commentBeingMousedOver}) => {
    const { component, changeComponent } = useContext(PageContext);

    const [isHovered, toggleHover] = useState(false);
    return (
        <div className={styles.delete_button}>
            <button
                className={`${styles.button} ${commentBeingMousedOver === idx ?
                    styles.active :
                    styles.inactive}`}
                onClick={() => {
                    changeComponent({
                        id: component.id === null ? idx : null,
                        type: component.id === null ? "delete" : null,
                        popups: {
                            ...component.popups,
                            modal: !component.popups.popup
                        }
                    })
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