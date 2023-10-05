import { useState } from 'react';

import styles from './Banner.module.css'

import Icon from '../popups/Icon';

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

const Banner = ({currentPage}) => {
    const {name, icon} = currentPage;
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <Icon component="banner" 
                icon={icon}
                relatedToComments={false}/>
                <div>{name}</div>
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