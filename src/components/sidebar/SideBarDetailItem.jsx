import React, { useState } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from './Icon';

import { Link } from 'react-router-dom';

const SideBarDetailItem = ({icon, name, forward, dots, plus, changePage, activePage}) => {
    const [isHovered, updateHover] = useState(false);
    const link_name = name.toLowerCase().split(' ').join('_');
    return (
        <Link to={`/${link_name}`}>
            <div 
                className={`${styles.main} 
                    ${activePage == name ? styles.active : styles.inactive} 
                    ${isHovered ? styles.hover : styles.inactive}`}
                onMouseEnter={() => updateHover(!isHovered)}
                onMouseLeave={() => updateHover(!isHovered)}
                onClick={() => changePage([name, icon])}
            >

                <div className={styles.left}>
                    <Icon icon={forward}/>
                    <Icon icon={icon}/>
                    <div>{name}</div>
                </div>
                
                <div className={isHovered ? styles.right : styles.hidden}>
                    <Icon icon={dots}/>
                    <Icon icon={plus}/>
                </div>
            </div>
        </Link>
    )
}
    

export default SideBarDetailItem;