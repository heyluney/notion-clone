import { useState, useContext } from 'react';

import useOutsideModalAlerter from '../../hooks/OutsideModalAlert';
import styles from './Modal.module.css';

import { PageContext } from '../../App';
import { useRef } from 'react';

import { saveItem } from '../../data/database/database_functions';

const Modal = () => {
    const { pages, changePages, 
        currentPageName,
        component, changeComponent } = useContext(PageContext);

    const wrapperRef = useRef();
    useOutsideModalAlerter(wrapperRef);
    

    const [cancelIsHovered, toggleCancelIsHovered] = useState(false);
    return (
        component.popups.modal && <div className={`${styles.none} 
            ${component.popups.modal ? styles.popup : null}`}
            ref={wrapperRef}>
            <div className={styles.question}>
                Would you like to delete this comment?
            </div>
            <button
                className={`${styles.delete} 
                    ${cancelIsHovered ? styles.active : null}`}
                onClick={() => {
                    const newPages = deleteComment(pages, currentPageName, component.id);
                    changePages(newPages);
                    saveItem('pages', newPages);
                    changeComponent({
                        id: null,
                        type: null,
                        popups: {
                            ...component.popups,
                            modal: false
                        }
                    });
                }}>
                Delete
            </button>
            <button onClick={() => changeComponent({
                        id: null,
                        type: null,
                        popups: {
                            ...component.popups,
                            modal: false
                        }
                    })}
                onMouseEnter={() => toggleCancelIsHovered(!cancelIsHovered)}
                onMouseLeave={() => toggleCancelIsHovered(!cancelIsHovered)}>
                Cancel
            </button>
        </div>
    )
}

export default Modal;