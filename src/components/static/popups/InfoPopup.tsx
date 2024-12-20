import styles from './InfoPopup.module.css';

// React component in charge of helpful tips/info (most often when hovering over a component).
interface popupProps {
    text: string | string[] | [string, string][]
}

const InfoPopup: React.FC<popupProps> = ({ text }) => {
    const renderText = (text: popupProps['text']): (string | JSX.Element | JSX.Element[]) => {
        if (typeof text === 'string') {
            return text
        } else {
            if (typeof text[0] === 'string') {
                return text.map((verb, idx) => 
                    <div key={idx} className={styles.emphasize}>{verb}</div>)
            } else {
                return text.map(([verb, description], idx) =>
                    <div key={idx}>
                        <span className={styles.emphasize}>{verb}</span> {description}
                    </div>)
            }
        }
    }

    return (<div className={styles.popup}>{renderText(text)}</div>)
}

export default InfoPopup;