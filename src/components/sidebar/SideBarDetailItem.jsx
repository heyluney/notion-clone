import React, { useState } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from './Icon';


const SideBarDetailItem = ({icon, name, forward, dots, plus, changePage}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
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
    )
}
    

export default SideBarDetailItem;