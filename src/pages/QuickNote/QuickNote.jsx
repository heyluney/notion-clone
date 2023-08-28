import { useState } from 'react';
import styles from './QuickNote.module.css'
import Comments from '../../components/comment/Comments'

const QuickNote = () => {
    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    return (
        <div className={styles.quicknote}>
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
            <div>
                TODO LIST!
                TODO LIST!
                TODO LIST!
                TODO LIST!
                TODO LIST!
                TODO LIST!
            </div>
        </div>
    )
}

export default QuickNote;