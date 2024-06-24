import styles from './SideBarMenu.module.css';
// import styles from './Title.module.css';
import { useRef } from 'react';

import useOutsideAlerter from '../../../hooks/OutsideAlerter';
import { deleteComponent, moveComponent, duplicateComponent } from "../../../data/database/database_functions";

const SideBarMenu = ({ toggleSideBarMenuShown }) => {
    const sideBarRef = useRef(null);
    useOutsideAlerter(sideBarRef, toggleSideBarMenuShown);

    return (
        <div ref={sideBarRef}
            className={styles.side_bar_menu}>
            This is the sidebar menu
        </div>
    )
}

export default SideBarMenu;