import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import styles from './SideBarItem.module.css';

import { BsThreeDots as Ellipses } from 'react-icons/bs';

import SideBarMenu from '../menus/SideBarMenu';

import Header from '../header/Header';

const SideBarItem = ({ page, idx, draggableState, draggableHandlers }) => {
    const navigate = useNavigate();

    // we can pass in parameters for how we want the hoverability to work, like what color the item will be when we hover over it
    // useHoverable();
    const [hover, toggleHover] = useState(false);
    const [sideBarMenuShown, toggleSideBarMenuShown] = useState(null);

    const { emoji, title } = page ? page.content : {};
    
    const {
        handleDragStart,
        handleDrag,
        handleDragOver,
        handleDrop
    } = draggableHandlers;
    return (
        <>
        {idx === draggableState.dropPageIdx ? <div className={styles.droppable_area}></div> : null}
        <div className={hover ? styles.sidebar_item_hover : styles.sidebar_item}
            draggable={true}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragStart = {() => handleDragStart(page.id)}
            onDrag={(e) => handleDrag(e)}
            onDrop={handleDrop}
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
        </>
    )
}

export default SideBarItem;



// when this is dragged over another child, we change 


          {/* <button onClick={() => changeComponents(duplicateComponent(components, page.id))}>Dupe</button> */}
            {/* <button onClick={() => 
                changeComponents(deleteComponent(components, page.id))}>
                    Delete
            </button> */}