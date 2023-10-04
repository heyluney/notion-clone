import { useState,useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';


const SideBarDetailItem = ({currentPage, idx}) => {
    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;
    const [_, name, path, icon, Component] = currentPage;
 
    return (
        <div className={styles.left}>
            <Icon icon={icon} 
                component={`${"SideBarDetailItem"}_${idx}`}
                relatedToComments={false}
            />
            <Link to={allPages[name][2]} 
                className={styles.link}
                onClick={
                () => changePages([{...allPages}, name])
                }>
                {name}
            </Link>
        </div>
    )
}
    

export default SideBarDetailItem;