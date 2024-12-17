import { useRef, useEffect, useContext } from 'react';

import styles from './Button.module.css';

import { BsThreeDots as Ellipses } from "react-icons/bs";
import { FaPlus as Plus } from "react-icons/fa";

import { PageContext } from '../../../App';
import useHoverable from "../../../hooks/useHoverable";

import Popup from "../popups/Popup";

const Button = ({type, id}) => {
    const { hoverableState, 
        hoverableStateHandlers: { handleMouseEnter, handleMouseLeave } } 
    = useHoverable();

    const map = {
        "ellipses": Ellipses,
        "plus": Plus
    }
    const { clickState, changeClickState } = useContext(PageContext);
    const Button = map[type];

    return (
        <div className={hoverableState ? styles.active : styles.inactive }
            onMouseEnter={(e) => handleMouseEnter(e)} 
            onMouseLeave={(e) => handleMouseLeave(e)}
            onClick={() => changeClickState(id)}
            >
            <Button />
            <Popup type={"new"} visible={id === clickState}/>
        </div>
    )
}

export default Button;