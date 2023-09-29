import { useState, useContext } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emojis';

import EmojiSelector from '../../components/popups/EmojiSelector';

const Icon = ({icon, idx, relatedToComments, emojiPopup, toggleEmojiPopup}) => {
    const Icon = icon;
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : null}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
            onClick={() => {
                if (emojiPopup === -1) {
                    document.getElementById('overlay2').style.display = "block";
                    relatedToComments ? toggleEmojiPopup(idx) : toggleEmojiPopup(1);
                    // updateHover(!isHovered);
                } else {
                    document.getElementById('overlay2').style.display = "none";
                    toggleEmojiPopup(-1);
                    // updateHover(!isHovered);
                }
            }}
            >
            {typeof icon === "string" ? computeEmoji(icon) : <Icon />}

            {relatedToComments ? (
                idx === emojiPopup && <EmojiSelector 
                    idx={idx}
                    relatedToComments={relatedToComments}
                    emojiPopup={emojiPopup}
                    toggleEmojiPopup={toggleEmojiPopup}                     
                    />
            ) : (
                emojiPopup !== -1 && <EmojiSelector 
                idx={idx}
                relatedToComments={relatedToComments}
                emojiPopup={emojiPopup}
                toggleEmojiPopup={toggleEmojiPopup}                     
                />
            )}
            
        </div>
    )
}

export default Icon;