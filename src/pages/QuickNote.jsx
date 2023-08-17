import { useState } from 'react';
import styles from './QuickNote.module.css'
import Comments from '../components/comment/Comments'

const QuickNote = () => {
    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    return (
        <div className={styles.quicknote}>
            <Comments />
            <textarea 
                name="postContent" 
                value={textarea === null ? "" : textarea}
                onChange={(e) => {
                    changeTextArea(e.target.value);
                    localStorage.setItem('quicknote', e.target.value);
                }}/>
        </div>
    )
}

export default QuickNote;