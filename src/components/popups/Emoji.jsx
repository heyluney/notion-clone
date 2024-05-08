import { useState, useContext, useRef, useCallback } from 'react';

import styles from './Emoji.module.css';
import { PageContext } from '../../App';

import { computeEmoji } from '../../data/compute_emojis';

const Emoji = ({emoji}) => {
    const { pageEmoji } = useContext(PageContext);
    return (
        <div className={styles.emoji}>
            {computeEmoji(emoji === undefined ? pageEmoji : emoji)}
        </div>
    )
}

export default Emoji;