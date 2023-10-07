import { useState, useContext } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import Icon from '../../components/popups/Icon';

const Title = ({isLarge, horizontal}) => {
    const { pages, changePages, currentPageName, changeCurrentPageName } = useContext(PageContext);
    const currentPage = pages[currentPageName];
    const [isUpdatingTitle, updatingTitle] = useState(false);
    return (
        <div className={horizontal ? styles.title_horizontal : styles.title}>
            <Icon icon={currentPage.icon}
                isLarge={isLarge}
                component="Title"
                relatedToComments={false}
            />
            <textarea
                className={styles.title}
                readOnly={!isUpdatingTitle}
                defaultValue={currentPage.name}
                onClick={() => {
                    updatingTitle(true);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const newTitle = e.target.value;
                        const newPages = {...pages};
                        newPages[newTitle] = {...currentPage, name: newTitle};
                        delete newPages[currentPageName];
                        changePages(newPages);
                        changeCurrentPageName(e.target.value);
                        saveItem('current_page_name', newTitle);
                        saveItem('pages', newPages);
                        updatingTitle(false);
                    }
                }}
            />
        </div>
    )
}

export default Title;