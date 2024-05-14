import { useContext } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { calculateNextKey } from '../../utils/calculate_next_key';
import { PageContext } from '../../App';

import clark from '../../assets/clark_profile.jpg';

const SideBar = () =>{
    const { pages, changePages } = useContext(PageContext);

    return (
        <div className={`${styles.sidebar}`} >
            <ProfileItem 
                icon={<img className={styles.profile} src={clark} alt="clark_profile"/>} 
                name="Clark's Notion"/>
            
            {Object.entries(pages)
                        .map(([id, page]) => 
                        <SideBarDetailItem 
                            key={id}
                            id={id}
                            page={page} />)} 
            
            <button onClick={
                () => {
                    const next_page_id = calculateNextKey(pages);
                    changePages({...pages, [next_page_id]: "Untitled"});
                }}>
                    Add Page
                </button>
        </div>
    )
}
    

export default SideBar;