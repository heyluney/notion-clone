import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { PageContext } from '../../App';
import Emoji from '../popups/Emoji';
import { findEmoji } from '../../data/pages_helper_functions';

import Header from '../title/Header';

const SideBarDetailItem = ({ id, page }) => {
    const { changeCurrentPageId, emojis } = useContext(PageContext);

    // Link to encapsulate header component  
    return (
        <div className={styles.detail_item}>
            <Header isSmall={true}/>
            {/* <Emoji 
                emoji={findEmoji(emojis, "page", id)} />
            <Link
                to={`/notion-clone/${id}`}
                onClick={() => {
                    changeCurrentPageId(id)
                }}>
                {page}
            </Link> */}
        </div>
    )
}


export default SideBarDetailItem;