import React, { useState } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from './Icon';

import { Link } from 'react-router-dom';

const SideBarDetailItem = ({currentPage, changePage}) => {
    const [name, path, icon, Component] = currentPage;
    return (
        <Link to={path}>
            <div onClick={() => changePage([name, path, icon, Component])}>
                <div className={styles.left}>
                    <Icon icon={icon}/>
                    <div>{name}</div>
                </div>
            </div>
        </Link>
    )
}
    

export default SideBarDetailItem;