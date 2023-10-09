import { useContext, useEffect } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext, SlideOutContext } from '../../App';

// Index is necessary to trigger the correct emoji selector popup 
// for the right page in the sidebar (otherwise multiple popups will be)
// triggered.
const SideBarDetailItem = ({idx, name, icon, path}) => {
    const { currentPageName, changeCurrentPageName } = useContext(PageContext);
    const { toggleSlideOut } = useContext(SlideOutContext);

    // Closes the slide out if the page isn't journal.
    useEffect(() => {
        if (currentPageName !== 'Journal') {
            toggleSlideOut(null);
        }
    }, [currentPageName])

    return (
        <div className={styles.left}>
            <Icon icon={icon} 
                component={`${"SideBarDetailItem"}_${idx}`}
                relatedToComments={false}
            />
            <Link to={path} 
                className={styles.link}
                onClick={
                    () => changeCurrentPageName(name)
                }>
                <div className={styles.name}>{name}</div>
            </Link>
        </div>
    )
}
    

export default SideBarDetailItem;