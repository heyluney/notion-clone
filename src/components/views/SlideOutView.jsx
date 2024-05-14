import { useContext } from 'react';

import styles from './SlideOutView.module.css';

import { PageContext } from '../../App';

import Header from '../title/Header';
import { findEmoji } from '../../data/pages_helper_functions';

// should only need one object 
const SlideOutView = () => {
    const {emojis, activeEntity } = useContext(PageContext);

        return (
        <div className={styles.slide_out_view}>
            
           <Header title={activeEntity ? activeEntity.journal : null}
                    emoji={findEmoji(emojis, "journals",  1)}/>
        </div>
    )
}

export default SlideOutView;