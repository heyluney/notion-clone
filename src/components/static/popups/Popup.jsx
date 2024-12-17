import MorePopup from './MorePopup';
import NewPopup from './NewPopup';

import styles from './Popup.module.css'

// Abstract "Popup" component.
const Popup = ({type}) => {
    // Renders popup dynamically based on type (string).
    const map = {
        "more": MorePopup,
        "new": NewPopup
    };

    const Popup = map[type];

    return (
        <div className={styles.popup}>
            <Popup />       
        </div>
    )
    
}

export default Popup;