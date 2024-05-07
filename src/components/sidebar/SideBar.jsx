import { useContext } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { PageContext } from '../../App';

import clark from '../../assets/clark_profile.jpg';

const SideBar = () =>{
    const { pages } = useContext(PageContext);

    return (
        <div className={`${styles.sidebar}`} >
            <ProfileItem 
                icon={<img className={styles.profile} src={clark} alt="clark_profile"/>} 
                name="Clark's Notion"/>
            
            {Object.values(pages)
                        .map((page, idx) => 
                        <SideBarDetailItem 
                            key={idx}
                            idx={idx}
                            page={page} />)} 
        </div>
    )
}
    

export default SideBar;