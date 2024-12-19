import { useContext } from 'react';

import styles from './Button.module.css';

import { BsThreeDots as Ellipses } from "react-icons/bs";
import { FaPlus as Plus } from "react-icons/fa";

import { PageContext } from '../../../App';

import Popup from "../popups/Popup";

const map = {
    "ellipses": Ellipses,
    "plus": Plus
}

const Button = ({ type, id }) => {
    const { clickState, changeClickState } = useContext(PageContext);

    const Button = map[type];
    return (
        <div className={styles.button}
            onClick={() => changeClickState(id)}>
            <Button />
            <Popup componentName="newPopup" 
            visible={id === clickState} 
            text={[["Close", "Click or ⌘"], ["Resize", "Drag"]]}/>
        </div>
    )
}


export default Button;