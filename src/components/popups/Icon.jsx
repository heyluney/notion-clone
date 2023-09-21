import { useState } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emojis';

import EmojiSelector from '../../components/popups/EmojiSelector';


const Icon = ({icon}) => {
    const Icon = icon;

    const [displayEmoji, updateDisplayEmoji] = useState(false);
    const [isHovered, updateHover] = useState(false);

    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onClick={() => updateDisplayEmoji(!displayEmoji)}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            >
            {typeof icon === "string" ? computeEmoji(icon) : <Icon />}

            <EmojiSelector 
                    updateDisplayEmoji={updateDisplayEmoji} 
                    displayEmoji={displayEmoji}/>
        </div>
    )
}

export default Icon;