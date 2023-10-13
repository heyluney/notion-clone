import { useState, useContext, useRef } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext, SlideOutContext } from '../../App';
import styles from './Title.module.css';

import Icon from '../../components/popups/Icon';
import { editTitle, editJournalTitle } from '../../data/pages_helper_functions';


import { useAutosizeDefaultTextArea }
 from '../../hooks/AutosizeTextArea';

const Title = ({isLarge, horizontal, title, emoji, type}) => {

    const { slideOut } = useContext(SlideOutContext);
    const { pages, changePages, currentPageName, changeCurrentPageName } = useContext(PageContext);
    const currentPage = pages[currentPageName];
    const [isUpdatingTitle, updatingTitle] = useState(false);

    const titleRef = useRef();
    useAutosizeDefaultTextArea(titleRef);

    return (
        <div className={horizontal ? styles.title_horizontal : styles.title}>
            <Icon icon={emoji !== undefined ? emoji : currentPage.icon}
                isLarge={isLarge}
                component={title === undefined ? "Title" : title}
                type={type}
            />
            <textarea
                ref={titleRef}
                className={styles.textarea}
                readOnly={!isUpdatingTitle}
                defaultValue={title !== undefined ? title : currentPage.name}
                onClick={() => {
                    updatingTitle(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        let newPages;
                        if (type === 'journal') {
                            newPages = 
                            editJournalTitle(pages, currentPageName, slideOut, e.target.value);
                        } else {
                            newPages = editTitle(pages, currentPageName, e.target.value);
                            changeCurrentPageName(e.target.value);
                            saveItem('current_page_name', e.target.value);
                        }
                        changePages(newPages);
                        saveItem('pages', newPages);
                        updatingTitle(false);
                    }
                }}
            />
        </div>
    )
}

export default Title;