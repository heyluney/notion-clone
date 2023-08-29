import styles from './Emoji.module.css';

const Emoji = () => {
    return (
        <div className={styles.emoji}>
            <div className={styles.types}>
                Emojis Icons Custom
            </div>
            <div>This is where the search bar will be</div>
            <div className={styles.row}>
                <div>&#128053;</div><div>&#129463;</div>
            </div>
            <div className={styles.row}>
                <div>&#129463;</div>
            </div>
        </div>
    )
}

export default Emoji;