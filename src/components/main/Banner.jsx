import { useContext } from 'react';

import styles from './Banner.module.css'

import { PageContext } from '../../App';

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

import Emoji from '../popups/Emoji';

const Banner = () => {
    const { pages, currentPageId, pageEmoji } = useContext(PageContext);
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <div>
                    <Emoji emoji={pageEmoji}/>
                </div>
                <div>{pages[currentPageId]}</div>
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