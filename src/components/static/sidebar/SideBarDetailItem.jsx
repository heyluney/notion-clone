import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import styles from './SideBarDetailItem.module.css';

import { moveComponent } from '../../../data/database/database_functions';

import { BsThreeDots as Ellipses } from 'react-icons/bs';

import SideBarMenu from '../menus/SideBarMenu';

import Header from '../header/Header';
import { PageContext } from '../../../App';

const SideBarDetailItem = ({ page, idx,  changeDraggedPageId, changeDropPageIdx, draggedPageId, dropPageIdx }) => {
    const navigate = useNavigate();

    const {components, changeComponents} = useContext(PageContext);

    const [hover, toggleHover] = useState(false);
    const [sideBarMenuShown, toggleSideBarMenuShown] = useState(null);

    // we define handleDragOver, handleDrag, handleDrop in the hook

    // onDragOver = {handleDragOver}, onDrag = {handleDrag}, onDrop = {handleDrop}
    // console.log('page', page)
    const { emoji, title } = page ? page.content : {};

    // I want to extract this drag & drop capability
    return (
        <div className={hover ? styles.sidebar_item_hover : 
            styles.sidebar_item}
            draggable={true}
            onDragOver={e => {
                e.preventDefault();
                toggleHover(true);
                changeDropPageIdx(idx);
            }}
            onDrag={e => {
                e.preventDefault();
                changeDraggedPageId(page.id);
            }}
            onDrop={() => {
                const updatedComponents = moveComponent(components, draggedPageId, 0, dropPageIdx);
                changeComponents(updatedComponents)
            }}
            onClick={() => {
                navigate(`/${page.id}`);
            }}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
            >

            <Header
                id={`SideBarDetailItem_${page.id}`}
                isSmall={true}
                readOnly={true}
                title={title}
                emoji={emoji} />
            
            <div className={hover ? 
                    styles.additional_options : 
                    styles.additional_options_none}
                >
                <div className={styles.ellipses} 
                    onClick={(e) => {
                        e.stopPropagation();
                        // changeActiveComponents('popup');
                    }}>
                    <Ellipses />
                </div>
                {sideBarMenuShown === page.id && 
                    <SideBarMenu toggleSideBarMenuShown={toggleSideBarMenuShown}/>}
            </div>
        </div>
    )
}

export default SideBarDetailItem;



// when this is dragged over another child, we change 


          {/* <button onClick={() => changeComponents(duplicateComponent(components, page.id))}>Dupe</button> */}
            {/* <button onClick={() => 
                changeComponents(deleteComponent(components, page.id))}>
                    Delete
            </button> */}