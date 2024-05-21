import { useContext } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { getChildComponents, createComponent } from '../../data/database/database_functions';
import { PageContext } from '../../App';

import clark from '../../assets/clark_profile.jpg';

const SideBar = () => {
    const { components, 
        changeComponents, 
        changeActiveComponents } = useContext(PageContext);

    const pages = getChildComponents(components, 0, "page");


    return (
        <div className={`${styles.sidebar}`} >
            <ProfileItem
                icon={<img className={styles.profile} 
                src={clark} 
                alt="clark_profile" />}
                name="Clark's Notion" />


            {pages.map(page =>
                    <SideBarDetailItem
                        key={page.id}
                        page={page} />)}


            <button onClick={
                () => {
                    const newComponent = createComponent(
                        components, 
                        'page',
                        /*parent_id*/0,
                        {title: "Untitled"}, 
                        true
                    );
         
                    changeComponents({
                        ...components, 
                        [newComponent.id]: newComponent
                    });
                    changeActiveComponents({
                        "page": newComponent.id
                    })
                    window.history.replaceState
                        (null, "", `notion-clone/${newComponent.id}`);
                }}>
                Add Page
            </button>
        </div>
    )
}


export default SideBar;