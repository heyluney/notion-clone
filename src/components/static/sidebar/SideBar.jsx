import { useContext, useEffect, useState } from 'react';
import styles from './SideBar.module.css'; 

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { createComponent } from '../../../data/database/database_functions';
import { PageContext } from '../../../App';

import clark from '../../../assets/clark_profile.jpg';

import { retrieveLatestKey } from '../../../data/database/database_functions';

const SideBar = ({page_ids}) => {
    const { components,
        changeComponents } = useContext(PageContext);

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
                    const last_key = retrieveLatestKey(components);

                    const updatedComponents = createComponent(
                        components,
                        'page',
                        0);
                    changeComponents(updatedComponents);
                    
                    window.history.replaceState(null, "", `${last_key+1}`);
                }}>
                Add Page
            </button>
        </div>
    )
}


export default SideBar;