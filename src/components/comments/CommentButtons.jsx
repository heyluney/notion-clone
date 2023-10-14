import { useContext } from 'react';

import { PopupContext } from '../../App';
import { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai';

import styles from './CommentButtons.module.css';

const CommentEmojis = ({idx, 
        commentBeingMousedOver,
        commentBeingEdited,
        changeCommentBeingEdited,
    }) => {
    const { togglePopup } = useContext(PopupContext);

    return (        
    commentBeingEdited !== idx
        &&   <div className={styles.buttons}>
        <button 
            className={`${styles.button} 
                ${commentBeingMousedOver === idx ?
                    styles.edit_active 
                    : styles.edit_inactive}`}
            onClick={() => {
                changeCommentBeingEdited(idx);
            }}>
            <Edit/> 
        </button>
        <button 
            className={`${styles.button} ${
                commentBeingMousedOver === idx ? 
                    styles.delete_active : 
                        styles.delete_inactive}`}
            onClick={() => {
                togglePopup(`Delete_${idx}`);
            }}>
                <Delete /> 
        </button>
    </div>
    );
}

export default CommentEmojis;