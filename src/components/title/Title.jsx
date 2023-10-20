import { useState, useContext, useRef } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import Icon from '../../components/popups/Icon';
import { editTitle, editJournalTitle, editTodo } from '../../data/pages_helper_functions';


import { useAutosizeDefaultTextArea }
 from '../../hooks/AutosizeTextArea';

const Title = ({isLarge, horizontal, title, emoji }) => {
    const { pages, changePages, 
        currentPageName, changeCurrentPageName, 
        component, changeComponent} = useContext(PageContext);

    const currentPage = pages[currentPageName];
    const [isUpdatingTitle, updatingTitle] = useState(false);

    const titleRef = useRef();
    useAutosizeDefaultTextArea(titleRef);
    return (
        <div className={horizontal ? styles.title_horizontal : styles.title}>
            <div onClick={() => {
                    changeComponent({
                        id: component.type === null ? "" : null,
                        type: component.type === null ? "title" : null,
                        popups: {
                            ...component.popups,
                            emoji: !component.popups.emoji
                        }
                    })
                }} >
                    <Icon icon={emoji !== undefined ? emoji : currentPage.icon}
                        isLarge={isLarge}
                        value={`title_`}
                    />
            </div>
            <textarea
                ref={titleRef}
                className={styles.textarea}
                readOnly={!isUpdatingTitle}
                defaultValue={title}
                onClick={() => {
                    updatingTitle(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        let newPages;
                        switch(component.type) {
                            case 'journal_slideout': 
                                newPages = 
                                editJournalTitle(pages, currentPageName, component.id, e.target.value);
                                break;
                            case 'tasklist': 
                                newPages = editTodo(pages,
                                    currentPageName, component.id,
                                    e.target.value);
                                break;
                            default: 
                                newPages = editTitle(pages, currentPageName, e.target.value);
                                changeCurrentPageName(e.target.value);
                                saveItem('current_page_name', e.target.value);
                                break;
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