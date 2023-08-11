import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles

import SideBarItem from './SideBarItem';
import SideBarDetailItem from './SideBarDetailItem';
import clark from '../../assets/clark_profile.jpg';

import { LuClock9 as Clock, 
        LuImport as Import } from 'react-icons/lu';
import { FaSearch as Search, 
        FaPlusCircle as Plus,
        FaShapes as Shapes } from 'react-icons/fa';
import { BsGearFill as Gear, 
        BsFileEarmark as Earmark, 
        BsScissors as Scissors,
        BsBookFill as Book,
        BsBookHalf as Book2,
        BsPlus as Plus2,
        BsFillPeopleFill as People,
    BsTrash2Fill as Trash } from 'react-icons/bs';

const SideBar = ({changePage}) =>{
    const arr = [["Search", "Search"]];

    return (
        <div className={`${styles.sidebar}`} >

        {
        arr.map(x => <SideBarItem emoji={`<${x[1]} />`} name={x[0]} />)
        }
        <SideBarItem emoji={ <img className={styles.profile} src={clark} />} name="Clark ButtButt's Notion"/>

        <SideBarItem emoji={<Search />} name="Search"/>
        <SideBarItem emoji={<Clock />} name="Updates"/>
        <SideBarItem emoji={<Gear />} name="Settings & members"/>
        <SideBarItem emoji={<Plus />} name="New page"/>

        <SideBarDetailItem 
            changePage={changePage}
            emoji={<Earmark/>} name="Getting Started"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Quick Note"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Personal Home"/>
        <SideBarDetailItem emoji={<Scissors/>} name="Task List"/>
        <SideBarDetailItem emoji={<Book/>} name="Journal"/>
        <SideBarDetailItem emoji={<Book2/>} name="Reading List"/>
        <SideBarDetailItem emoji={<Earmark/>} name="Untitled"/>
        <SideBarDetailItem emoji={<Plus2/>} name="Add a page"/>


        <SideBarItem emoji={<People/>} name="Create a teamspace"/>
        <SideBarItem emoji={<Shapes/>} name="Templates"/>
        <SideBarItem emoji={<Import />} name="Import"/>
        <SideBarItem emoji={<Trash />} name="Trash"/>

        </div>
    )
}
    

export default SideBar;