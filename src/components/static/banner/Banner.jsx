import { useContext } from 'react';

import styles from './Banner.module.css'

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star } from 'react-icons/bs';

import { PageContext } from '../../../App';
import Header from '../header/Header';

const Banner = ({id, title, emoji}) => {
    const { globalStyles } = useContext(PageContext);
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <Header 
                    id={`Banner_${id}`}
                    isSmall={true} 
                    title={title}
                    emoji={emoji} />
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