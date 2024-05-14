import { useState, useContext, useRef, useCallback } from 'react';

import styles from './Emoji.module.css';
import { PageContext } from '../../App';

import { findEmoji } from '../../data/pages_helper_functions';
import { computeEmoji } from '../../data/compute_emojis';

const Emoji = ({emoji}) => {
    const { emojis, currentPageId } = useContext(PageContext);
    return (
        <div className={styles.emoji}>
            {computeEmoji(emoji === undefined ? 
                findEmoji(emojis, 'pages', currentPageId) : 
                emoji)}
        </div>
    )
}

export default Emoji;