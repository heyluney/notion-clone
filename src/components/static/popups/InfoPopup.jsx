import styles from './InfoPopup.module.css';

// React component in charge of helpful tips/info (most often when hovering over a component).
const InfoPopup = ({ text }) => {
    // Accomodates rendering text in string, or array, or array of tuples. 
    const renderText = (text) => {
        if (typeof text == "string") {
            return text;
        } else {
            if (typeof text[0] == "string") {
                return text.map((verb, idx) => 
                    <span key={idx}>{verb}</span>)
            } else {
                return text.map(([verb, description], idx) =>
                    <div key={idx}>
                        <span className={styles.emphasize}>{verb}</span> {description}
                    </div>)
            }
        }
    }

    return (
        <div className={styles.popup}>
            {renderText(text)}
        </div>
    )
}

export default InfoPopup;