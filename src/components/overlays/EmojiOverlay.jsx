import styles from './EmojiOverlay.module.css';

import { useContext } from 'react';

import { PageContext }  from '../../App';


const EmojiOverlay = () => {
    const { component } = useContext(PageContext);
    return (
            component.popups.emoji && 
                <div className={styles.emoji_overlay}
                    style={{display: "block" }}/>
    )
}

export default EmojiOverlay;