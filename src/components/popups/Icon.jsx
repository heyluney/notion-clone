import { useState, useContext, useEffect, Fragment, useRef } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../utils/compute_emojis';

import { PopupContext } from '../../App';

import EmojiSelector from '../../components/popups/EmojiSelector';

// "component" allows us to toggle EmojiSelector only under the appropriately clicked icon.
const Icon = ({icon, component, relatedToComments}) => {
    const Icon = icon;
    const [isHovered, updateHover] = useState(false);

    const { popup, togglePopup } = useContext(PopupContext);
    return (
        <div className={styles.group}>
            <div 
                className={`${styles.main} ${isHovered ? styles.active : null}`}
                onMouseEnter={() => updateHover(!isHovered)}
                onMouseLeave={() => updateHover(!isHovered)}
                onMouseUp={() => {
                        togglePopup(popup === null ? component : null)
                    }}
                >
                {typeof icon === "string" ? 
                    computeEmoji(icon) : 
                    <Icon />}
            </div>
            {popup === component && <EmojiSelector 
                component={component}
                relatedToComments={relatedToComments}/>}
        </div>
    )
}

export default Icon;