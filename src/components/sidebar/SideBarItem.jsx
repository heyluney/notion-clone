import React, { useState } from 'react';
import styles from './SideBarItem.module.css';

const SideBarItem = ({name, emoji}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={isHovered ? styles.active : styles.inactive }
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            {emoji}{name}
            
        </div>
    )
}
    

export default SideBarItem;