import { useContext } from 'react';

import styles from './Banner.module.css'

import Icon from '../popups/Icon';

import { PageContext } from '../../App';

import {PiClockFill as Clock } from 'react-icons/pi';
import {BiMessageDots as Message } from 'react-icons/bi';
import {BsStar as Star} from 'react-icons/bs';

const Banner = () => {
    const { pages, currentPageName, 
            component, changeComponent } = useContext(PageContext)
   
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                <div onClick={() => {
                    changeComponent({
                        id: component.type === null ? "" : null,
                        type: component.type === null ? "banner" : null,
                        popups: {
                            ...component.popups,
                            emoji: !component.popups.emoji
                        }
                    })
                }}>
                    <Icon icon={pages[currentPageName].icon} 
                        value="banner_"/>
                </div>
                <div>{currentPageName}</div>
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