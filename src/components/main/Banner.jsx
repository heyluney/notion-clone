import { useState } from 'react';

import styles from './Banner.module.css'

import Icon from '../popups/Icon';

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

const Banner = ({currentPage}) => {
    // In all other contexts except comments, the emoji selector isn't associated with a particuular numbered emoji
    // so the emojiPopup (the toggle) is between -1 (not showing) and 1 (showing) rather than a list of numbers.
    const [emojiPopup, toggleEmojiPopup] = useState(-1);

    const [idx, currentName, path, icon, Component] = currentPage;
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <Icon icon={icon}
                 idx={-1}
                 relatedToComments={false} 
                 emojiPopup={emojiPopup} 
                 toggleEmojiPopup={toggleEmojiPopup}
                />
                <div>{currentName}</div>
            </div>
            <div className={styles.right}>
                <Message />
                <Clock />
                <Star />
            </div>
        </div>
    )
}

export default Banner;