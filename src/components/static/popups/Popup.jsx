import MorePopup from './MorePopup';
import NewPopup from './NewPopup';
import InfoPopup from './InfoPopup';

import styles from './Popup.module.css'

// Abstract "Popup" component.
const Popup = ({type, visible}) => {
    if (!visible) return;
    // Renders popup dynamically based on type (string).
    const map = {
        "more": MorePopup,
        "new": NewPopup,
        "info": InfoPopup
    };

    const Popup = map[type];

    return (
        <div className={styles.popup}>
            <Popup />       
        </div>
    )
    
}

export default Popup;