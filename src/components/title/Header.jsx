import { useContext } from "react";

import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

import { PageContext } from "../../App";


const Header = ({isSmall, emoji}) => {
    const { pages, currentPageId } = useContext(PageContext);

    return (        
        <div className={isSmall ? styles.header_small : styles.header }>
            <Emoji className={styles.emoji}/>
            <Title passedTitle={pages[currentPageId]}/>
        </div>
    )
}

export default Header;