import React, { useState } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from './Icon';

import {IoIosArrowForward as ForwardArrow } from 'react-icons/io';
import { BsThreeDots as ThreeDots, 
        BsPlus as Plus } from 'react-icons/bs';

const SideBarDetailItem = ({name, emoji, changePage}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            onClick={() => changePage(name)}
        >
            <div className={styles.left}>
                <Icon icon={<ForwardArrow/>}/>
                <Icon icon={emoji}/>
                {name}
            </div>
            
            <div className={isHovered ? styles.right : styles.hidden}>
                <Icon icon={<ThreeDots />}/>
                <Icon icon={<Plus />}/>
            </div>
        </div>
    )
}
    

export default SideBarDetailItem;