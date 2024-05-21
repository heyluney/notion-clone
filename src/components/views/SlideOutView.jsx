import { useContext } from 'react';

import styles from './SlideOutView.module.css';

import { PageContext } from '../../App';

import Header from '../title/Header';

import { getChildComponents } from '../../data/database/database_functions';

const SlideOutView = () => {
    const { components } = useContext(PageContext);

        return (
        <div className={styles.slide_out_view}>
            
           <Header />
        </div>
    )
}

export default SlideOutView;