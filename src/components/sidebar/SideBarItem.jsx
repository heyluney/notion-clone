import { useState } from 'react';
import styles from './SideBarItem.module.css';
import Icon from './Icon';

const SideBarItem = ({name, emoji}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            <Icon icon={emoji}/>
            {name}

        </div>
    )
}

export default SideBarItem;