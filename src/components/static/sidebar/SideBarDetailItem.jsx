import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { useState } from 'react';
import { moveComponent } from '../../../data/database/database_functions';
import { PageContext } from '../../../App';
import { getComponentAttribute } from '../../../data/database/database_functions';

import { BsThreeDots as Ellipses } from 'react-icons/bs';

import SideBarMenu from '../menus/SideBarMenu';

import Header from '../header/Header';

const SideBarDetailItem = ({ page, idx,  changeDraggedPageId, changeDropPageIdx, draggedPageId, dropPageIdx }) => {
    const navigate = useNavigate();

    const { components,
        changeComponents, changeActiveComponents } = useContext(PageContext);

    const [hover, toggleHover] = useState(false);
    const [sideBarMenuShown, toggleSideBarMenuShown] = useState(null);

    const onDrop = () => {
        const updatedComponents = moveComponent(components, draggedPageId, 0, dropPageIdx);
        changeComponents(updatedComponents);
    }

    console.log('sideBarMenuShown', sideBarMenuShown)
    return (
        <div className={hover ? styles.sidebar_item_hover : styles.sidebar_item}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
            onClick={(e) => {
                navigate(`/notion-clone/${page.id}`);
            }}
            onDragOver={e => {
                e.preventDefault();
                changeDropPageIdx(idx);
            }}
            onDrag={e => {
                e.preventDefault();
                changeDraggedPageId(page.id);
            }}
            onDrop={() => onDrop()}>

            <Header
                id={`SideBarDetailItem_${page.id}`}
                isSmall={true}
                readOnly={true}
                title={page.title}
                emoji={getComponentAttribute(components, page.id, "emoji")} />
            
            <div className={hover ? 
                    styles.additional_options : 
                    styles.additional_options_none}
                >
                <div className={styles.ellipses} 
                    onClick={(e) => {
                        e.stopPropagation();
                        changeActiveComponents('popup');
                    }}>
                    <Ellipses />
                </div>
                {sideBarMenuShown === page.id && 
                    <SideBarMenu toggleSideBarMenuShown={toggleSideBarMenuShown}/>}
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