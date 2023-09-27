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
                // If it's already open, wnat to close it 
                // if (idx === -1) {
                //     // open it 
                //     relatedToComments ? toggleEmojiPopup(idx) : toggleEmojiPopup(1);
                // } else {
                //     // It's open, close it
                //     toggleEmojiPopup(-1);
                // }
                if (relatedToComments) {
                    toggleEmojiPopup(idx);
                } else {
                    toggleEmojiPopup(1);
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