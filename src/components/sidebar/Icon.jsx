import { useState } from 'react';
import styles from './Icon.module.css';

const Icon = ({icon}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            >
            {icon}
        </div>
    )
}

export default Icon;