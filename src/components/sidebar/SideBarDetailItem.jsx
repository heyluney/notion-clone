import { useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';


const SideBarDetailItem = ({currentPage}) => {
    const { pages, changePages } = useContext(PageContext);
    const [allPages, _] = pages;

    const [name, path, icon, Component] = currentPage;

    return (
        <Link to={path} >
            <div onClick={() => changePages([{...allPages}, name])}>
                <div className={styles.left}>
                    <Icon icon={icon}/>
                    <div>{name}</div>
                </div>
            </div>
        </Link>
    )
}
    

export default SideBarDetailItem;