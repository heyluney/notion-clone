import { useContext } from 'react';

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
    return (
        <div className={`${styles.none} ${popup && popup.includes("Delete") && styles.popup}`}
            ref={wrapperRef}>
            <div className={styles.question}>Would you like to delete this comment?</div>
            <button
                className={styles.delete}
                onClick={() => {
                    const newComments = {...comments};
                    delete newComments[popup];
                    changeComments(newComments);
                    saveItem('quicknote-comments', newComments);
                    togglePopup(null);
                }}>
                Delete
            </button>
            <button onClick={() => togglePopup(null)}>
                Cancel
            </button>
        </div>
    )
}

export default Popup;