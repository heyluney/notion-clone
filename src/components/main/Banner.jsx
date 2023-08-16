import styles from './Banner.module.css'

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

const Banner = ({page}) => {
    const [name, icon] = page;
    const Icon = icon;
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <Icon />
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