import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';

import { LuClock9 } from 'react-icons/lu';
import { FaSearch as Search, 
        FaPlusCircle as Plus } from 'react-icons/fa';
import { BsGearFill as Gear, 
        BsFileEarmark as Earmark, 
        BsScissors as Scissors,
        BsBookFill as Book,
        BsBookHalf as Book2,
        BsPlus as Plus2 } from 'react-icons/bs';

const SideBar = () =>{
    return (
        <div
            className={`${styles.sidebar}`}
        >
        <SideBarItem emoji={<Search />} name="Search"/>
        <SideBarItem emoji={<LuClock9 />} name="Updates"/>
        <SideBarItem emoji={<Gear />} name="Settings & members"/>
        <SideBarItem emoji={<Plus />} name="New page"/>

        <SideBarDetailItem emoji={<Earmark/>} name="Getting Started"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Quick Note"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Personal Home"/>
        <SideBarDetailItem emoji={<Scissors/>} name="Task List"/>
        <SideBarDetailItem emoji={<Book/>} name="Journal"/>
        <SideBarDetailItem emoji={<Book2/>} name="Reading List"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Untitled"/>
        <SideBarDetailItem emoji={<Plus2/>} name="Add a page"/>


        <SideBarItem emoji="🐐" name="Create a teamspace"/>
        <SideBarItem emoji="👏" name="Templates"/>
        <SideBarItem emoji="🐍" name="Import"/>
        <SideBarItem emoji="🐍" name="Trash"/>

        </div>
    )
}
    

export default SideBar;