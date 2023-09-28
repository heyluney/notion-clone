import { useState, useContext } from 'react';
import styles from './QuickNote.module.css';

import Icon from '../../components/popups/Icon';

import Comments from '../../components/comment/Comments';
import Title from '../../components/title/Title';

import { PageContext } from '../../App';

const QuickNote = () => {
    const {icon} = useContext(PageContext);

    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));

    // In all other contexts except comments, the emoji selector isn't associated with a particuular numbered emoji
    // so the emojiPopup (the toggle) is between -1 (not showing) and 1 (showing) rather than a list of numbers.
    const [emojiPopup, toggleEmojiPopup] = useState(-1);
    return (
        <div className={styles.quicknote}>
            <div className={styles.title}>
                <Icon icon={icon} 
                        idx={-1}
                        relatedToComments={false} 
                        emojiPopup={emojiPopup} 
                        toggleEmojiPopup={toggleEmojiPopup}
                />
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
            <div className={styles.list}>
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