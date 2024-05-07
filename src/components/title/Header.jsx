import { useContext } from "react";

import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

import { PageContext } from "../../App";


const Header = () => {
    const { pageEmoji } = useContext(PageContext);

    return (        
        <div className={styles.title}>
            <Emoji emoji={pageEmoji} 
                className={styles.emoji}/>
            <Title />
        </div>
    )
}

export default Header;