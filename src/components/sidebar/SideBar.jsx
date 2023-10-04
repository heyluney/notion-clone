import { useContext } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarDetailItem from './SideBarDetailItem';

import { PageContext } from '../../App';

import clark from '../../assets/clark_profile.jpg';


const SideBar = () =>{
    const { pages } = useContext(PageContext);
    const [allPages, active] = pages;
    return (
        <div className={`${styles.sidebar}`} >
            <ProfileItem 
                icon={<img className={styles.profile} src={clark}/>} 
                name="Clarkie ButtButt's Notion"/>
            
            {Object.values(allPages)
                .sort((a,b) => a[0] - b[0])
                .map(([idx, name, path, icon, Component]) => (
                        <SideBarDetailItem
                            key={name}
                            idx={idx}
                            currentPage={[idx, name, path, icon, Component]}
                        />
                    ))}
        </div>
    )
}
    

export default SideBar;