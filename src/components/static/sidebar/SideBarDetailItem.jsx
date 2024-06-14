import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { useState } from 'react';
import { moveComponent } from '../../../data/database/database_functions';
import { PageContext } from '../../../App';
import { getComponentAttribute, deleteComponent, duplicateComponent } from '../../../data/database/database_functions';

import { BsThreeDots as Ellipses } from 'react-icons/bs';


import Header from '../header/Header';

const SideBarDetailItem = ({ page, idx,  changeDraggedPageId, changeDropPageIdx, draggedPageId, dropPageIdx }) => {
    const { components,
        changeComponents } = useContext(PageContext);

    const [hover, toggleHover] = useState(false);

    const onDrop = () => {
        const updatedComponents = moveComponent(components, draggedPageId, 0, dropPageIdx);
        changeComponents(updatedComponents);
    }

    return (
        <div className={hover ? styles.sidebar_item_hover : styles.sidebar_item}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
            onDragOver={e => {
                e.preventDefault();
                changeDropPageIdx(idx);
            }}
            onDrag={e => {
                e.preventDefault();
                changeDraggedPageId(page.id);
            }}
            onDrop={() => onDrop()}>
            <Link 
                to={`/notion-clone/${page.id}`}
               >
            <Header
                id={`SideBarDetailItem_${page.id}`}
                isSmall={true}
                title={page.title}
                emoji={getComponentAttribute(components, page.id, "emoji")} />
            </Link>
            
            <div className={hover ? 
                    styles.additional_options : 
                    styles.additional_options_none}
                >
                <div className={styles.ellipses}><Ellipses /></div>
            </div>
        </div>
    )
}

          {/* <button onClick={() => changeComponents(duplicateComponent(components, page.id))}>Dupe</button> */}
            {/* <button onClick={() => 
                changeComponents(deleteComponent(components, page.id))}>
                    Delete
            </button> */}

export default SideBarDetailItem;