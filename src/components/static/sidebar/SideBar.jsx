import { useContext, useRef } from 'react';
import styles from './SideBar.module.css'; 

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';

import { createComponent } from '../../../data/database/database_functions';

import { PageContext } from '../../../App';
import useDraggable from '../../../hooks/useDraggable';
import useSlideable from '../../../hooks/useSlideable';

const SideBar = () => {
    const {components, changeComponents,
        hoverState
    }  = useContext(PageContext);
    const { 
        draggableState, draggableHandlers: {handleDragStart,
        handleDrag,
        handleDragOver,
        handleDrop}} = useDraggable(/*app_id=*/0);
    const ref = useRef();

    const { width } = useSlideable(ref)
    
    const currentPageId = parseInt(window.location.hash.substring(2));
    // The current sidebar item is highlighted if it is (1) equal to the current page being displayed or (2) hovered over.
    return (
        <div style={{ 
                width: `${width}px`,
            }}
            className={`${styles.sidebar}`} >
            <div style={{ width: `${width-5}px` }}>
                <ProfileItem />

                {components[0].children.map((page_id, idx) =>
                    <SideBarItem
                        key={page_id}
                        active={currentPageId === page_id || hoverState.has(page_id)}
                        idx={idx}
                        page={components[page_id]}
                        draggableState={draggableState}
                        handleDragStart={handleDragStart}
                        handleDrag={handleDrag}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        />)}

                <button onClick={
                    () => {
                        changeComponents(createComponent(components,'page', 0));
                    }}>
                    Add Page
                </button>  
            </div>
            <div ref={ref} className={styles.sidebar_edge}></div>
        </div>
    )
}


export default SideBar;