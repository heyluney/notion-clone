import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';


import {IoIosArrowForward as ForwardArrow } from 'react-icons/io';
import { BsThreeDots as ThreeDots, 
        BsPlus as Plus } from 'react-icons/bs';

import clark from '../../assets/clark_profile.jpg';

const SideBar = ({components, activePage, changePage}) =>{

    return (
        <div className={`${styles.sidebar}`} >

            <ProfileItem 
                icon={<img className={styles.profile} src={clark}/>} 
                name="Clark ButtButt's Notion"/>
            
            {Object.keys(components).map((key, idx) => {
                const [icon, is_detail_item] = components[key];
                return is_detail_item ? 
                    <SideBarDetailItem 
                        key={idx}
                        icon={icon}
                        name={key} 
                        forward={ForwardArrow}
                        dots={ThreeDots}
                        plus={Plus}
                        activePage={activePage}
                        changePage={changePage}
                        />
                    :
                    <SideBarItem 
                        key={idx}
                        icon={icon} 
                        name={key} />
            })}
        </div>
    )
}
    

export default SideBar;