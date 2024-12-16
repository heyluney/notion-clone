import styles from './Overlay.module.css';

const Overlay = ({visible}) => {
    return <>
        {visible && <div className={styles.overlay} />}
    </>
}

export default Overlay;