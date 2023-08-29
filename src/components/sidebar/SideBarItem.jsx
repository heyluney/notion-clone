import { useState } from 'react';
import styles from './SideBarItem.module.css';
import Icon from '../popups/Icon';



const SideBarItem = ({name, icon}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.hover : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            <Icon icon={icon}/>
            <div>{name}</div>
        </div>
    )
}

export default SideBarItem;