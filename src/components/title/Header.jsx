import { useContext } from 'react';

import { PageContext } from '../../App';

import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

// small = true, then use SmallHeader

const SmallHeader = ({emoji, title}) => {
    // console.log('emoji', emoji, 'small title', title)
    return (        
        <div className={styles.header_small}>
            <Emoji emoji={emoji}/>
            <Title title={title} />
        </div>
    )
}

const BigHeader = ({emoji, title}) => {
    // console.log('emoji', emoji, 'big title', title)
    return (
        <div className={styles.header_big}>
        <Emoji emoji={emoji}/>
        <Title 
            title={title} />
        </div>
    )
}

const Header = ({emoji, title, isSmall}) => {
    return (  
        <div>     
        {isSmall ? 
            <SmallHeader 
                emoji={emoji} 
                title={title}/> : 
            <BigHeader 
                emoji={emoji}
                title={title}/>}
        </div> 
    )
}

export default Header;