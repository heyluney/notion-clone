import { useState } from 'react';
import styles from './SideBarItem.module.css';
import Icon from './Icon';

import { LuClock9 as Clock } from 'react-icons/lu';


const SideBarItem = ({name, emoji}) => {
    console.log('emoji', emoji);
    const components = {
        clock: Clock
    }
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            <Icon icon={components[emoji]}/>
            <div>{name}</div>

        </div>
    )
}

export default SideBarItem;