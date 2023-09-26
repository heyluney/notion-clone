import { useState, useContext } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emojis';

import EmojiSelector from '../../components/popups/EmojiSelector';
import { PopupContext } from '../../App';

const Icon = ({icon, relatedToComments, currentCommentIdx}) => {
    const Icon = icon;
    const [displayEmoji, updateDisplayEmoji] = useState(false);
    const [isHovered, updateHover] = useState(false);

    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onClick={() => {
                // updatePopup(!displayEmoji);
                updateDisplayEmoji(!displayEmoji);
                document.getElementById('overlay2').style.display = "block";

            }}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            >
            {typeof icon === "string" ? computeEmoji(icon) : <Icon />}

            <EmojiSelector 
                    updateDisplayEmoji={updateDisplayEmoji} 
                    displayEmoji={displayEmoji}
                    relatedToComments={relatedToComments}
                    currentCommentIdx={currentCommentIdx}/>
        </div>
    )
}

export default Icon;