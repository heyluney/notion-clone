import { useState, useContext } from 'react';
import styles from './QuickNote.module.css';

import Icon from '../../components/popups/Icon';
import Comments from '../../components/comment/Comments';

import { PageContext } from '../../App';

const QuickNote = () => {
    const {pages, changePages} = useContext(PageContext);
    const [allPages, active] = pages;
    const [name, _, icon, __] = allPages[active];

    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    return (
        <div className={styles.quicknote}>
            <div>{name}</div>
            <Icon icon={icon}/>

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