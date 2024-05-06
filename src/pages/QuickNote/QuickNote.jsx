import { useState, useContext } from 'react';

import { PageContext } from '../../App';
import styles from './QuickNote.module.css';

import Comments from '../../components/comments/Comments';
import Title from '../../components/title/Title';
import Emoji from '../../components/popups/Emoji';

import { findEmoji, findComments } from '../../data/pages_helper_functions';
import { entity_to_entity_id_map } from '../../utils/maps';

const QuickNote = () => {   
    const {emojis, 
           comments, 
           currentPageId} = useContext(PageContext);
    
    const pageEmoji = findEmoji(
        emojis, 
        entity_to_entity_id_map['page'], 
        currentPageId);
    
    const pageComments = findComments(
        comments, 
        entity_to_entity_id_map['page'], 
        currentPageId);
    
    return (
        <div className={styles.quicknote}>
            <div>
                <Emoji emoji={pageEmoji} className={styles.emoji}/>
                <Title />
            </div>

            <Comments comments={pageComments}/>
  
            <div className={styles.list}>
                Todo placeholder. Lorem ipsum.
            </div>
        </div>
    )
}

export default QuickNote;