import { Fragment, useContext } from 'react';
import styles from './Overlay.module.css'

import { PopupContext } from './App';
import Popup from './components/popups/Popup';


// Only one overlay can ever be displayed at a time
// Popup is null => this means that no popup is open at the current moment.
// Popup starts with 'Delete' => this means that only the popup overlay is open.
// Popup is any other value => this means that the emoji overlay is open (Emoji selector).
const Overlay = () => {
    const { popup } = useContext(PopupContext);

    return (
        <Fragment>
        {popup.startsWith('Delete') 
            ?
                 <Fragment>
                    <Popup />
                    <div className={styles.popup_overlay}
                        style={{display: popup.startsWith('Delete') ? 'block' : 'none' }}>
                    </div>
                </Fragment>
            :
                <div className={styles.emoji_overlay}
                    style={{ display: 
                        popup === null ? 'none' : 'block' 
                    }}>
                </div> 
        }
      </Fragment>
    )
}

export default Overlay;