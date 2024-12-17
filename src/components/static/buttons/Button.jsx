import { useRef, useEffect } from 'react';

import styles from './Button.module.css';

import { BsThreeDots as Ellipses } from "react-icons/bs";
import { FaPlus as Plus } from "react-icons/fa";

import useClickable from "../../../hooks/useClickable";
import useHoverable from "../../../hooks/useHoverable";

import Popup from "../popups/Popup";

// Text on button is determined by type.
const Button = ({type}) => {
    const { hoverableState, 
        hoverableStateHandlers: { handleMouseEnter, handleMouseLeave } } 
    = useHoverable();

    const map = {
        "ellipses": Ellipses,
        "plus": Plus
    }

    const ref = useRef(null);
    const [clickState] = useClickable(ref);

    const Button = map[type];

    return (
        <div ref={ref}
            className={hoverableState ? styles.active : styles.inactive }
            onMouseEnter={(e) => handleMouseEnter(e)} 
            onMouseLeave={(e) => handleMouseLeave(e)}
            >
            <Button />
            {clickState && <Popup type={"new"}/>}
        </div>
    )
}

export default Button;