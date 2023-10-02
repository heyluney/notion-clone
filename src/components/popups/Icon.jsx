import { useState, useContext } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emojis';

import EmojiSelector from '../../components/popups/EmojiSelector';

const Icon = ({icon, idx, relatedToComments, emojiPopup, toggleEmojiPopup}) => {
    const Icon = icon;
    const [isHovered, updateHover] = useState(false);

    const emojiSelectorOpen = relatedToComments ? idx === emojiPopup : 
        emojiPopup !== -1;
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            onClick={() => {
                if (emojiPopup === -1) {
                    document.getElementById('overlay2').style.display = "block";
                    relatedToComments ? toggleEmojiPopup(idx) : toggleEmojiPopup(1);
                } else {
                    document.getElementById('overlay2').style.display = "none";
                    toggleEmojiPopup(-1);
                }
            }}
            >
            {typeof icon === "string" ? computeEmoji(icon) : <Icon />}

            {emojiSelectorOpen && <EmojiSelector 
                    idx={idx}
                    relatedToComments={relatedToComments}
                    emojiPopup={emojiPopup}
                    toggleEmojiPopup={toggleEmojiPopup}                     
                    />
            }
        </div>
    )
}

export default Icon;