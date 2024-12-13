import { useContext } from 'react';

import styles from './Button.module.css';

import { BsThreeDots as Ellipses } from "react-icons/bs";
import { FaPlus as Plus } from "react-icons/fa";

import { PageContext } from '../../../App';

import Popup from "../popups/Popup";

const Button = ({ type, id }) => {
    const { clickState, changeClickState } = useContext(PageContext);

    const Button = map[type];
    return (
        <div className={styles.button}
            onClick={() => changeClickState(id)}>
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