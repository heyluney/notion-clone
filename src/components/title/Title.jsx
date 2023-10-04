import { useState, useContext } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext } from '../../App';
import styles from './Title.module.css';

import Icon from '../../components/popups/Icon';

const Title = () => {
    const {icon} = useContext(PageContext);

    const { pages, changePages, name } = useContext(PageContext);
    const [allPages, active] = pages;
    const [isUpdatingTitle, updatingTitle] = useState(false);
    return (
        <div className={styles.title}>
            <Icon icon={icon}
                isLarge={true}
                component="Title"
                relatedToComments={false}
            />
            <textarea
                className={styles.title}
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
                                    .map((x, idx) => idx == 1 ? newPageTitle : x)
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
    )
}

export default Title;