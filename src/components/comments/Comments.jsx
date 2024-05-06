import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import { PageContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import CommentEmojis from './CommentEmojis';

import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

import MetaComment from './MetaComment';

const Comments = ({comments}) => {
    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
            Object.entries(comments).map(([idx, comment]) =>
                    <div className={styles.comment}
                        key={idx}
                    >
                        {comment}
                    </div>)}
        </div>
 
    )
}

export default Comments;
