import { useContext } from 'react';

import styles from './SlideOutView.module.css';

import { PageContext } from '../../App';

import Header from '../title/Header';

const SlideOutView = () => {
    const { 
        journal,
        todos,
        currentPageId, 
        activeEntityId } = useContext(PageContext);


    let entity = null;
    if (activeEntityId !== -1) {
        if (currentPageId === 3) {
            entity = journal[activeEntityId];
        } else if (currentPageId === 4) {
            entity = todos[activeEntityId];
        }
    }


    return (
        <div>
            
            {entity && entity.journal}
        </div>
    )
}

export default SlideOutView;