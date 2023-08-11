import { useState } from 'react';
import styles from './SideBarItem.module.css';
import Icon from './Icon';



const SideBarItem = ({name, icon, changePage}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            onClick={() => changePage(name)}
        >
            <Icon icon={icon}/>
            <div>{name}</div>
        </div>
    )
}

export default SideBarItem;