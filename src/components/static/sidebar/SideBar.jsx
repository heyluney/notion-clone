import { useContext, useEffect, useState } from 'react';
import styles from './SideBar.module.css'; 

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';

import { createComponent } from '../../../data/database/database_functions';

import { PageContext } from '../../../App';
import useDraggable from '../../../hooks/useDraggable';

const SideBar = () => {
    const {components, changeComponents}  = useContext(PageContext);
    const { draggableState, draggableHandlers: {handleDragStart,
        handleDrag,
        handleDragOver,
        handleDrop}} = useDraggable(/*app_id=*/0);

    return (
        <div className={`${styles.sidebar}`}>
            <ProfileItem />

            {components[0].children.map((page_id, idx) =>
                <SideBarItem
                    key={page_id}
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
    )
}


export default SideBar;