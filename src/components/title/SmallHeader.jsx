import styles from './SmallHeader.module.css';

import Title from "./Title";
import Emoji from "../popups/Emoji";

const SmallHeader = ({emoji, title}) => {
    return (        
        <div className={styles.header_small}>
            <Emoji emoji={emoji}/>
            <Title title={title} />
        </div>
    )
}

export default SmallHeader;