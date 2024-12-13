import { useContext, useEffect, useState } from 'react';
import styles from './SideBar.module.css'; 

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { createComponent } from '../../../data/database/database_functions';

import clark from '../../../assets/clark_profile.jpg';
import { PageContext } from '../../../App';
import useDraggable from '../../../hooks/useDraggable';

const SideBar = () => {
    const {components, changeComponents}  = useContext(PageContext);
    const { draggedPageId, changeDraggedPageId, dropPageIdx, changeDropPageIdx } = useDraggable();
    return (
        <div className={`${styles.sidebar}`}>
            <ProfileItem
                icon={<img className={styles.profile}
                src={clark}
                alt="clark_profile" />}
                    name="Clark's Notion" />

            {components ? components[0].children.map((page_id, idx) =>
                <SideBarDetailItem
                    key={page_id}
                    idx={idx}
                    page={components[page_id]} 
                    changeDraggedPageId={changeDraggedPageId}
                    changeDropPageIdx={changeDropPageIdx}
                    draggedPageId={draggedPageId}
                    dropPageIdx={dropPageIdx}
                    />) : null}

            <button onClick={() => changeComponents({
                0: {
                    children: [5, 4, 3, 2, 1],
                    component_type: 0,
                    content: {title: "Blah", emoji:  '1F363'},
                    id: 0,
                    parent_id: null
                }
            })}>test</button>
            
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