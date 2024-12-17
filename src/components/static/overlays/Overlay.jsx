import styles from './Overlay.module.css';

import { useContext } from 'react';
import { PageContext } from '../../../App';

const Overlay = ({visible}) => {
    const { changeClickState } = useContext(PageContext)
    return <>
        {visible && 
        <div 
        className={styles.overlay} 
        onClick={() => changeClickState(null)} />}
    </>
}

export default Overlay;