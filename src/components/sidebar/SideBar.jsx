import { useContext } from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';

import { PageContext } from '../../App';

import {IoIosArrowForward as ForwardArrow } from 'react-icons/io';
import { BsThreeDots as ThreeDots, 
        BsPlus as Plus } from 'react-icons/bs';

import clark from '../../assets/clark_profile.jpg';


const SideBar = () =>{
    const { pages, _ } = useContext(PageContext);
    const [allPages, active] = pages;
    return (
        <div className={`${styles.sidebar}`} >

            <ProfileItem 
                icon={<img className={styles.profile} src={clark}/>} 
                name="Clarkie ButtButt's Notion"/>
            
            {Object.values(allPages).map(([name, path, icon, Component]) => (
                        <SideBarDetailItem
                            key={name}
                            currentPage={[name, path, icon, Component]}
                        />
                    ))}
        </div>
    )
}
    

export default SideBar;