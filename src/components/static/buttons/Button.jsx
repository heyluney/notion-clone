import { useRef, useEffect, useContext } from 'react';

import styles from './Button.module.css';

import { BsThreeDots as Ellipses } from "react-icons/bs";
import { FaPlus as Plus } from "react-icons/fa";

import { PageContext } from '../../../App';

import Popup from "../popups/Popup";

const Button = ({ type, id, parentId }) => {
    const { 
        clickState, changeClickState,
        hoverState, hoverStateHandlers: 
        { handleMouseEnter, handleMouseLeave } } = useContext(PageContext);

    const Button = map[type];

    return (
        <div className={hoverState === id ? styles.active : styles.inactive}
            onMouseEnter={(e) => handleMouseEnter(e, id)}
            onMouseLeave={(e) => handleMouseLeave(e, parentId)}
            onClick={() => changeClickState(id)}
        >
            <Button />
            <Popup type={"new"} visible={id === clickState} />
        </div>
    )
}

const map = {
    "ellipses": Ellipses,
    "plus": Plus
}

export default Button;