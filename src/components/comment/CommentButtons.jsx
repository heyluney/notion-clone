import { useState } from 'react';

import { AiFillEdit as Edit, AiFillDelete as Delete } from 'react-icons/ai';

import styles from './CommentButtons.module.css';

const CommentEmojis = ({idx, 
        commentBeingMousedOver,
        changeCommentBeingEdited,
        togglePopup
    }) => {
    const [descriptor, changeDescriptor] = useState([null, -1]);

    return (        
    <div className={styles.buttons}>
        <button 
            className={`${styles.button} 
                ${commentBeingMousedOver === idx ?
                    styles.edit_active 
                    : styles.edit_inactive}`}
            onMouseEnter={() => {
                changeDescriptor(['edit', idx]);
            }}
            onMouseLeave={() => {
                changeDescriptor([null, -1])
            }}
            onClick={() => {
                changeCommentBeingEdited(idx);
            }}>
            <Edit/> 
            {descriptor[0] === 'edit' && descriptor[1] === idx && <div className={styles.descriptor}>
                Edit Comment
            </div>}
        </button>
        <button 
            className={`${styles.button} ${
                commentBeingMousedOver === idx ? 
                    styles.delete_active : 
                        styles.delete_inactive}`}
            onMouseEnter={() => {
                changeDescriptor(['delete', idx]);
            }}
            onMouseLeave={() => {
                changeDescriptor([null, -1])
            }}
            onClick={() => {
                togglePopup(idx);
                document.getElementById('overlay')
                    .style.display = "block";
            }}>
                <Delete /> 
            {descriptor[0] === 'delete' && descriptor[1] === idx && <div className={styles.descriptor}>
                Delete Comment
            </div>}
        </button>
    </div>);
}

export default CommentEmojis;