import { useContext, useState } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { retrieveLatestKey } from '../../data/database/database_functions';
import { createComponent } from '../../data/database/database_functions';
import { PageContext } from '../../App';

import { componentLibrary, getRandomComponent } from '../../data/database/component_library';

import clark from '../../assets/clark_profile.jpg';

const SideBar = () => {
    const { components,
        changeComponents } = useContext(PageContext);

    const page_ids = components[0].children;

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
                    const newComponents = createComponent(
                        components,
                        'page',
                        0,
                        page_ids.length,
                        {
                            emoji: getRandomComponent(componentLibrary, "emoji"),
                            title: getRandomComponent(componentLibrary, "title")
                        }
                    );

                    changeComponents(newComponents);
                }}>
                Add Page
            </button>
        </div>
    )
}


export default SideBar;