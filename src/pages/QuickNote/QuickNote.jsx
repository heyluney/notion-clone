import { useState } from 'react';
import styles from './QuickNote.module.css';

import Comments from '../../components/comments/Comments';
import Title from '../../components/title/Title';

const QuickNote = () => {
    const [textarea, changeTextArea] = 
        useState(localStorage.getItem('quicknote'));
    
    return (
        <div className={styles.quicknote}>
            <Title isLarge={true} />
            <Comments />
            <div>
                <textarea 
                    name="postContent" 
                    className={styles.textarea}
                    value={textarea === null ? "" : textarea}
                    onChange={(e) => {
                        changeTextArea(e.target.value);
                        localStorage.setItem('quicknote', e.target.value);
                    }}/>
            </div>
            <div className={styles.list}>
                Todo placeholder. Lorem ipsum.
            </div>
        </div>
    )
}

export default QuickNote;