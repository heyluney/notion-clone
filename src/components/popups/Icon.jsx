import { useState, useContext } from 'react';
import styles from './Icon.module.css';
import { computeEmoji } from '../../data/compute_emojis';

import { PageContext } from '../../App';

import Emoji from './Emoji';

// The value key helps determine which React component this Icon is associated with.
// If it matches the current "component" context, the emoji selector is toggled open.
const Icon = ({isLarge, icon, value}) => {
    const Icon = icon;
    const [isHovered, updateHover] = useState(false);
    const { component } = useContext(PageContext);

    // if ( `${component.type}_${component.id}` === "sidebar_3" && value === "sidebar_3") {
    //     console.log('component_string', `${component.type}_${component.id}`);
    //     console.log('value', value);
    // }

    return (
        <div className={styles.group}>
            <div 
                className={
                    `${isLarge ? styles.main_large : styles.main}
                    ${isHovered ? styles.active : null}`}
                onMouseEnter={() => updateHover(!isHovered)}
                onMouseLeave={() => updateHover(!isHovered)}
                >
                {typeof icon === "string" ? 
                    computeEmoji(icon) : 
                    <Icon />}
            </div>
            {component.popups.emoji === true 
            && value === `${component.type}_${component.id}` 
            && <Emoji component={component} />}
        </div>
    )
}

export default Icon;