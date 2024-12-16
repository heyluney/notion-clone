import { BsThreeDots as Ellipses } from "react-icons/bs";
import { useRef } from 'react';

import styles from './MoreButton.module.css';

import useClickable from "../../../hooks/useClickable";
import useHoverable from "../../../hooks/useHoverable";

// what is dynamic: 
// text on a button 
const MoreButton = () => {
    const { hoverableState, 
        hoverableStateHandlers: { handleMouseEnter, handleMouseLeave } } 
    = useHoverable();

    const ref = useRef(null);
    const [clickState] = useClickable(ref);

    return (
        <div ref={ref}
            className={hoverableState ? styles.active : styles.inactive }
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}>
            <Ellipses />
            {clickState && <div className={styles.popup}>Popup</div>}
        </div>
    )
}

export default MoreButton;