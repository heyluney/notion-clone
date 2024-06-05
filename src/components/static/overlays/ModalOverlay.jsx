import styles from './ModalOverlay.module.css';

import { useContext } from 'react';

import { PageContext }  from '../../../App'

const ModalOverlay = () => {
    const { component } = useContext(PageContext);
    return component.popups.modal && 
        <div className={styles.modal_overlay}
                style={{display: "block" }}/>
}

export default ModalOverlay;
