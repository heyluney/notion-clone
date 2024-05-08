import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import { PageContext } from '../../App';
import AddComment from './AddComment';


import EditButton from '../buttons/EditButton';

import MetaComment from './MetaComment';

import { getFullTimeString } from '../../utils/calculate_date';

const Comments = ({comments}) => {
    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
            Object.entries(comments).map(([idx, comment]) =>
                    <div className={styles.comment}
                        key={idx}
                    >
                        <div>{comment.comment}</div>
                        <div>{getFullTimeString(comment.timestamp)}</div>
                    </div>)}
        </div>
 
    )
}

export default Comments;
