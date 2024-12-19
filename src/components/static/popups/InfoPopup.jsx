import styles from './InfoPopup.module.css';

const InfoPopup = () => {
    return (
        <div className={styles.popup}>
            <div><span className={styles.emphasize}>Close</span> Click or ⌘ </div>
            <div><span className={styles.emphasize}>Resize</span> Drag</div>
        </div>
    )
}

export default InfoPopup;