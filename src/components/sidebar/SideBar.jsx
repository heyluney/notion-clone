import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';


import {IoIosArrowForward as ForwardArrow } from 'react-icons/io';
import { BsThreeDots as ThreeDots, 
        BsPlus as Plus } from 'react-icons/bs';

import clark from '../../assets/clark_profile.jpg';

const SideBar = ({pages, currentPage, changePage}) =>{
    console.log(Object.entries(pages))
    return (
        <div className={`${styles.sidebar}`} >

            <ProfileItem 
                icon={<img className={styles.profile} src={clark}/>} 
                name="Clark ButtButt's Notion"/>
            
            {Object.values(pages).map(([name, path, icon, Component]) => (
                        <SideBarDetailItem
                            key={name}
                            currentPage={[name, path, icon, Component]}
                            changePage={changePage}
                        />
                    ))}
        </div>
    )
}
    

export default SideBar;