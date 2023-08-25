import { useContext } from 'react';

import useOutsideAlerter from '../../hooks/OutsideAlert';
import styles from './Popup.module.css';

import { useRef } from 'react';
import { CommentContext } from '../../App';


const Popup = ({ togglePopup, idx }) => {
    const { comments, changeComments } = useContext(CommentContext);

    const wrapperRef = useRef();
    useOutsideAlerter(wrapperRef, togglePopup);

    return (
        <div
            className={styles.popup}
            ref={wrapperRef}>

            <div className={styles.question}>Would you like to delete this comment?</div>
            <button
                className={styles.delete}
                onClick={() => {
                    delete comments[idx];
                    changeComments(comments);
                    localStorage.setItem('quicknote-comments', JSON.stringify(comments));
                    togglePopup(-1);
                    document.getElementById('overlay').style.display = "none";
                }}>
                Delete
            </button>
            <button>Cancel</button>
        </div>
    )
}

export default Popup;