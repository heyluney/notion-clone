import { useState, useContext } from 'react';
import styles from './QuickNote.module.css';

import Icon from '../../components/popups/Icon';

import Comments from '../../components/comment/Comments';
import { saveItem } from '../../utils/local_storage';

import { PageContext } from '../../App';

const QuickNote = () => {
    const {pages, changePages} = useContext(PageContext);
    const [allPages, active] = pages;
    const [name, _, icon, __] = allPages[active];

    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    const [isUpdatingTitle, updatingTitle] = useState(false);
    
    return (
        <div className={styles.quicknote}>
            <div className={styles.title}>
                <div className={styles.emoji}>
                    <Icon icon={icon} />
                </div>
                <textarea
                    readOnly={!isUpdatingTitle}
                    defaultValue={name}
                    onClick={() => {
                        updatingTitle(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const newPageTitle = e.target.value;
                            const newPage = {
                                [e.target.value]:
                                    allPages[active]
                                    .map((x, idx) => idx == 0 ? newPageTitle : x)
                            };
                            const { [active]: value, ...allPagesWithOldRemoved } = allPages;
                            const newPages = [{ ...allPagesWithOldRemoved, ...newPage }, newPageTitle];
                            changePages(newPages);
                            saveItem('pages', newPages);
                            updatingTitle(false);
                        }
                    }}
                />
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