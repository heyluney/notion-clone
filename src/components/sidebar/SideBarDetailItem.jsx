import { useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

const SideBarDetailItem = ({idx, name, icon, path}) => {
    const { changeCurrentPageName, component, changeComponent } = useContext(PageContext);
    return (
        <div className={styles.left}>
            <div onClick={
                    () => {
                        changeComponent({
                            id: component.id === null ? idx : null,
                            type: component.type === null ? "sidebar" : null,
                            popups: {
                                ...component.popups,
                                emoji: !component.popups.emoji
                            }
                        });
                        changeCurrentPageName(name);
                        saveItem('current_page_name', name);
                    }
                }>
                <Icon icon={icon} 
                    value={`sidebar_${idx}`}
                />
            </div>
            <Link to={path} 
                className={styles.link}
                onClick={
                    () => {
                        changeCurrentPageName(name);
                        saveItem('current_page_name', name);
                        changeComponent({
                            id: null,
                            type: null,
                            popups: {
                                slideout: false,
                                modal: false,
                                emoji: false
                            }
                        })
                    }
                }
                >
                <div className={styles.name}>{name}</div>
            </Link>
        </div>
    )
}
    

export default SideBarDetailItem;