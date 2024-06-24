import styles from './Header.module.css';

import Title from "./Title";
import Emoji from "./Emoji";

import { ReadOnlyTitle } from './Title';

const Header = ({id, emoji, title, isSmall, readOnly}) => {
    return (  
        <div className={isSmall ? styles.header_small : styles.header_big}>
            <Emoji emoji={emoji}/>
            {readOnly ? 
                <ReadOnlyTitle title={title} /> : 
                <Title
                    id={id}
                    title={title}
                />}
        </div>
    )
}

export default Header;