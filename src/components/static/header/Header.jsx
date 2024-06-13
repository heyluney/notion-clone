import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "./Emoji";

// small = true, then use SmallHeader

const SmallHeader = ({emoji, title}) => {
    return (        
        <div className={styles.header_small}>
            <Emoji emoji={emoji}/>
            <Title title={title} />
        </div>
    )
}

const BigHeader = ({emoji, title}) => {
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