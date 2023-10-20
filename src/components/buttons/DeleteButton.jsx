import { useContext, useState } from 'react';

import styles from './DeleteButton.module.css';

import { PageContext } from '../../App';

import { AiFillDelete as Delete } from 'react-icons/ai';

import { deleteTodo } from '../../data/pages_helper_functions';
import { saveItem } from '../../utils/local_storage';

const DeleteButton = ({idx, type, itemBeingMousedOver}) => {
    const { pages, changePages, currentPageName, component, changeComponent } = useContext(PageContext);

    const [isHovered, toggleHover] = useState(false);

    return (
        <div className={styles.delete_button}>
            <button
                className={`${styles.button} ${itemBeingMousedOver === idx ? styles.active : styles.inactive}`}
                onClick={() => {
                    let newPages;
                    switch(type) {
                        case 'tasklist': 
                            newPages = deleteTodo(pages, currentPageName, idx);
                            break;
                        default:
                            newPages = {...pages};
                            break;
                    }
                    changePages(newPages);
                    saveItem('pages', newPages);


                    if (type === undefined) {
                        changeComponent({
                            id: component.id === null ? idx : null,
                            type: component.id === null ? "delete" : null,
                            popups: {
                                ...component.popups,
                                modal: !component.popups.popup
                            }
                        })
                    }
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