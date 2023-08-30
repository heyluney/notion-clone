import { useContext } from 'react';

import useOutsideAlerter from '../../hooks/OutsideAlert';
import styles from './Popup.module.css';

import { useRef } from 'react';
import { CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

// This popup component is specific to comments as of now, not sure if I want
// to make this more specific (e.g. CommentPopup) or broaden this component to make it 
// a more general popup component
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