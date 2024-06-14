
import { useState, useContext } from 'react';

import { PageContext } from '../../../App';
import styles from './Journal.module.css';

import JournalEntry from './JournalEntry';

import { moveComponent } from '../../../data/database/database_functions';

const Journal = ({component}) => {
    const { components, changeComponents } = useContext(PageContext);

    const [dropEntryIdx, changeDropEntryIdx] = useState(-1);
    const [draggedEntryId, changeDraggedEntryId] = useState(-1);

    const onDrop = (e) => {
        e.preventDefault();
        
        const updatedComponents =
        moveComponent(
            components, draggedEntryId, component.id, dropEntryIdx
        );
        changeComponents(updatedComponents);
    }
    return (
        <div className={styles.journal}
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => onDrop(e)}>
            <div className={styles.description}>
                {component.title}
            </div>

            {component.children
                .map((id, idx) =>
                <JournalEntry 
                    key={id} 
                    idx={idx}
                    entry={components[id]}
                    changeDropEntryIdx={changeDropEntryIdx}
                    changeDraggedEntryId={changeDraggedEntryId}
                    onDrop={onDrop}/>)
            }
        </div>
    )
}

export default Journal;
