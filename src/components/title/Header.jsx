import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

// small = true, then use SmallHeader
const Header = ({emoji, title}) => {
    return (        
        <div className={styles.header}>
            <Emoji emoji={emoji}/>
            <Title 
                title={title} 
                editable={false}/>
        </div>
    )
}

export default Header;