import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "./Emoji";

// ReactComponent_componentIdd
const Header = ({id, emoji, title, isSmall}) => {
    console.log('in here', id, 'title', title)
    return (  
        <div className={isSmall ? styles.header_small : styles.header_big}>
            <Emoji emoji={emoji}/>
            <Title
                id={id}
                title={title} />
        </div>
    )
}

export default Header;