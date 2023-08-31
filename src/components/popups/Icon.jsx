import { useState } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emoji';

const Icon = ({icon}) => {
    const Icon = icon;
    const [isHovered, updateHover] = useState(false);

    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            >
            {typeof icon === "string" ? computeEmoji(icon) : <Icon />}
        </div>
    )
}

export default Icon;