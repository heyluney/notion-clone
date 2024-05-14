import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { PageContext } from '../../App';

import { findEmoji } from '../../data/pages_helper_functions';

import Header from '../title/Header';

const SideBarDetailItem = ({ id, page }) => {
    const { emojis, changeCurrentPageId } = useContext(PageContext);

    return (
        <div>
            <Link 
                to={`/notion-clone/${id}`}
                onClick={() => changeCurrentPageId(id)}>
                <Header 
                    title={page}
                    emoji={findEmoji(emojis, "pages", id)}
                    
                    isSmall={true}
                    isTruncated={true} />
            </Link>
        </div>
    )
}


export default SideBarDetailItem;