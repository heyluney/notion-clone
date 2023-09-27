import { useState, useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';


const SideBarDetailItem = ({currentPage}) => {
    // In all other contexts except comments, the emoji selector isn't associated with a particuular numbered emoji
    // so the emojiPopup (the toggle) is between -1 (not showing) and 1 (showing) rather than a list of numbers.
    const [emojiPopup, toggleEmojiPopup] = useState(-1);

    const { pages, changePages } = useContext(PageContext);
    const [allPages, _] = pages;

    const [idx, name, path, icon, Component] = currentPage;
    return (
        <Link to={path} >
            <div onClick={() => changePages([{...allPages}, name])}>
                <div className={styles.left}>
                    <Icon icon={icon}
                    
                    relatedToComments={false} 
                    emojiPopup={emojiPopup} 
                    toggleEmojiPopup={toggleEmojiPopup}/>
                    <div>{name}</div>
                </div>
            </div>
        </Link>
    )
}
    

export default SideBarDetailItem;