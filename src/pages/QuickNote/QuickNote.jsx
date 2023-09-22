import { useState, useContext } from 'react';
import styles from './QuickNote.module.css';

import Icon from '../../components/popups/Icon';

import Comments from '../../components/comment/Comments';
import Title from '../../components/title/Title';

import { PageContext } from '../../App';

const QuickNote = () => {
    // console.log('icon', icon);
    const {icon} = useContext(PageContext);

    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    
    return (
        <div className={styles.quicknote}>
            <div className={styles.title}>
                <div className={styles.emoji}>
                    <Icon icon={icon} />
                </div>
                <Title />
            </div>
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