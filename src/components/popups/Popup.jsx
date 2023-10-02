import { useContext } from 'react';

import useOutsideAlerter from '../../hooks/OutsideAlert';
import styles from './Popup.module.css';

import { useRef } from 'react';
import { CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

const Popup = ({ popup, togglePopup, idx }) => {
    const { comments, changeComments } = useContext(CommentContext);

    const wrapperRef = useRef();
    useOutsideAlerter(wrapperRef, togglePopup, 'overlay');
    return (
        <div
            className={`${styles.none} ${idx !== -1 && popup === idx ? styles.popup : null}`}
            ref={wrapperRef}>
            <div className={styles.question}>Would you like to delete this comment?</div>
            <button
                className={styles.delete}
                onClick={() => {
                    const newComments = {...comments};
                    delete newComments[idx];
                    changeComments(newComments);
                    saveItem('quicknote-comments', newComments);
                    togglePopup(-1);
                    document.getElementById('overlay').style.display = "none";
                }}>
                Delete
            </button>
            <button onClick={() => {
                togglePopup(-1);
                document.getElementById('overlay').style.display = "none";
            }}>Cancel</button>
        </div>
    )
}

export default Popup;