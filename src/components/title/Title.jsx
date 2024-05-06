import { useState, useContext, useRef } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import Icon from '../../components/popups/Icon';
import { editTitle, editJournalTitle, editTodo } from '../../data/pages_helper_functions';


import { useAutosizeDefaultTextArea }
 from '../../hooks/AutosizeTextArea';

const Title = () => {
    const { currentPageId, pages, changePages } = useContext(PageContext);

    const [title, updateTitle] = useState(pages[currentPageId]);

    const titleRef = useRef();
    useAutosizeDefaultTextArea(titleRef);

    return (
        <div className={styles.title}>
                <textarea
                    ref={titleRef}
                    className={styles.textarea}
                    value={title}
                    onChange={(e) => {
                        e.preventDefault();
                        updateTitle(e.target.value);
                        changePages({...pages, [currentPageId]: e.target.value})
                    }}
                />            
        </div>
    )
}

export default Title;