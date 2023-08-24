
import useOutsideAlerter from '../../hooks/OutsideAlert';
import styles from './Popup.module.css';

import { useRef, useContext } from 'react';

import { PopupContext } from '../../App';

const Popup = () => {
    const { popup, togglePopup } = useContext(PopupContext);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, togglePopup);

    return (
    <div 
         ref={wrapperRef}
          className={styles.popup}>
          Would you like to delete this comment?
          <button>Delete</button>
          <button>Cancel</button>
        </div>
    )
}

export default Popup;