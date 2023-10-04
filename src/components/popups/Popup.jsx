import { useState, useContext } from 'react';

import useOutsideAlerter from '../../hooks/OutsideAlert';
import styles from './Popup.module.css';

import { useRef } from 'react';
import { PopupContext, CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

// Need comment idx in order to figure out which comment to delete.
const Popup = () => {
    const { comments, changeComments } = useContext(CommentContext);
    const { popup, togglePopup } = useContext(PopupContext);

    const wrapperRef = useRef();
    useOutsideAlerter(wrapperRef);

    const [ cancelIsHovered, toggleCancelIsHovered ] = useState(false);
    return (
        <div className={`${styles.none} ${popup && popup.includes("Delete") && styles.popup}`}
            ref={wrapperRef}>
            <div className={styles.question}>
                Would you like to delete this comment?
            </div>
            <button
                className={`${styles.delete} 
                    ${cancelIsHovered ? styles.active : null}`}
                onClick={() => {
                    const newComments = {...comments};
                    const idx = parseInt(popup.split('_')[1]);
                    delete newComments[idx];
                    changeComments(newComments);
                    saveItem('quicknote-comments', newComments);
                    togglePopup(null);
                }}>
                Delete
            </button>
            <button onClick={() => togglePopup(null)}
                onMouseEnter={() => toggleCancelIsHovered(!cancelIsHovered)}
                onMouseLeave={() => toggleCancelIsHovered(!cancelIsHovered)}>
                Cancel
            </button>
        </div>
    )
}

export default Popup;