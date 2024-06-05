import styles from './Emoji.module.css';

import { computeEmoji } from '../../data/compute_emojis';

const Emoji = ({emoji}) => {
    return (
        <div className={styles.emoji}>
            {emoji ? 
                computeEmoji(emoji) : 
                computeEmoji("1F9D7 1F3FB 200D 2640 FE0F")}
        </div>
    )
}

export default Emoji;