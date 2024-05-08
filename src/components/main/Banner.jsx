import { useContext } from 'react';

import styles from './Banner.module.css'


import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

import Header from '../title/Header';
const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <Header isSmall={true} />
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