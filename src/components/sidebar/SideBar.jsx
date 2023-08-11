import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import ProfileItem from './ProfileItem';
import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';


import {IoIosArrowForward as ForwardArrow } from 'react-icons/io';
import { BsThreeDots as ThreeDots, 
        BsPlus as Plus } from 'react-icons/bs';

import clark from '../../assets/clark_profile.jpg';

const SideBar = ({components, changePage}) =>{

    return (
        <div className={`${styles.sidebar}`} >

            <ProfileItem 
                icon={<img className={styles.profile} src={clark}/>} 
                name="Clark ButtButt's Notion"/>
            
            {Object.keys(components).map(key => {
                const [icon, is_detail_item] = components[key];
                return is_detail_item ? 
                    <SideBarDetailItem 
                        icon={icon}
                        name={key} 
                        forward={ForwardArrow}
                        dots={ThreeDots}
                        plus={Plus}
                        changePage={changePage}
                        />
                    :
                    <SideBarItem 
                        icon={icon} 
                        name={key} />
            })}
        </div>
    )
}
    

export default SideBar;