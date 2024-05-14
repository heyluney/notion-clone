import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

const Header = ({
        isTruncated,
        isSmall, 
        emoji, 
        title, 
        canEdit
    }) => {
    return (        
        <div className={isSmall ? styles.header_small : styles.header }>
            <Emoji className={styles.emoji} emoji={emoji}/>
            <Title 
                passedTitle={title} 
                canEdit={canEdit}
                isTruncated={isTruncated}/>
        </div>
    )
}

export default Header;