import { useContext, useEffect, useState } from 'react';
import styles from './SideBar.module.css'; 

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { createComponent } from '../../../data/database/database_functions';
import { PageContext } from '../../../App';

import clark from '../../../assets/clark_profile.jpg';

// button functionality can change though 

// button that "adds"
// button that "deletes"
// button that duplicates, etc.

const SideBar = ({page_ids}) => {
    const { components, changeComponents } = useContext(PageContext);

    // Keeps track of drag state.
    const [draggedPageId, changeDraggedPageId] = useState(-1);
    const [dropPageIdx, changeDropPageIdx] = useState(-1);
 
    return (
        <div className={`${styles.sidebar}`}>
            <ProfileItem
                icon={<img className={styles.profile}
                    src={clark}
                    alt="clark_profile" />}
                    name="Clark's Notion" />

            {page_ids.map((page_id, idx) =>
                <SideBarDetailItem
                    key={page_id}
                    idx={idx}
                    page={components[page_id]} 
                    changeDraggedPageId={changeDraggedPageId}
                    changeDropPageIdx={changeDropPageIdx}
                    draggedPageId={draggedPageId}
                    dropPageIdx={dropPageIdx}
                    />)}

            
            <button onClick={
                () => {
                    const updatedComponents = createComponent(
                        components,
                        'page',
                        0);
                    changeComponents(updatedComponents);
                    
                    // Figure out how to re-render the page just newly createdd
                    // window.history.replaceState(null, "", `${last_key+1}`);
                }}>
                Add Page
            </button>
        </div>
    )
}


export default SideBar;