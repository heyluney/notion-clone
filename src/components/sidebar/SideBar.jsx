import React from 'react';
import styles from './SideBar.module.css'; // Import css modules stylesheet as styles
import SideBarItem from './SideBarItem';

const SideBar = () =>{
    return (
        <h1
            className={styles.sidebar}
        >
        <SideBarItem name="Getting Started" emoji="🐐"/>
        <SideBarItem name="Quick Note"/>
        <SideBarItem name="Personal Home"/>
        <SideBarItem name="Task List"/>
        <SideBarItem name="Journal"/>

        </h1>
    )
}
    

export default SideBar;