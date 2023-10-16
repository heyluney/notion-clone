import { useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

// Index is necessary to trigger the correct emoji selector popup 
// for the right page in the sidebar (otherwise multiple popups will be)
// triggered.
const SideBarDetailItem = ({idx, name, icon, path}) => {
    const { changeCurrentPageName } = useContext(PageContext);
    return (
        <div className={styles.left}>
            <Icon icon={icon} 
                component={`${"SideBarDetailItem"}_${idx}`}
            />
            <Link to={path} 
                className={styles.link}
                onClick={
                    () => {
                        changeCurrentPageName(name);
                        saveItem('current_page_name', name);
                    }
                }>
                <div className={styles.name}>{name}</div>
            </Link>
        </div>
    )
}
    

export default SideBarDetailItem;