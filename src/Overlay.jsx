import { Fragment, useContext } from 'react';
import styles from './Overlay.module.css'

import { PageContext }  from './App';
import Popup from './components/popups/Popup';


// Which popup is open (e.g. emoji vs. popup) is determined by the popup field in the component.
const Overlay = () => {
    const { component } = useContext(PageContext);

    return (
        <Fragment>
            {component.popups.popup && <Popup />}
            {component.popups.modal && 
                <div className={styles.modal_overlay}
                style={{display: "block" }}/>}
            {component.popups.emoji && 
                <div className={styles.emoji_overlay}
                style={{display: "block" }}/>}
        </Fragment>
    )
}

export default Overlay;