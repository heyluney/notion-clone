import { useState,useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';


const SideBarDetailItem = ({currentPage}) => {
    // In all other contexts except comments, the emoji selector isn't associated with a particuular numbered emoji
    // so the emojiPopup (the toggle) is between -1 (not showing) and 1 (showing) rather than a list of numbers.
    const [emojiPopup, toggleEmojiPopup] = useState(-1);

    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;
    const [idx, name, path, icon, Component] = currentPage;
 
    return (
        <div className={styles.left}>
            <Icon icon={icon}
            idx={-1}
            relatedToComments={false} 
            emojiPopup={emojiPopup} 
            toggleEmojiPopup={toggleEmojiPopup}/>
            <Link to={allPages[name][2]} onClick={
                () => changePages([{...allPages}, name])
                }>
                {name}
            </Link>
        </div>
    )
}
    

export default SideBarDetailItem;