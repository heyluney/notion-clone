
import { useContext } from 'react';

import { PageContext } from '../../App';
import styles from './Journal.module.css';

import JournalEntry from './JournalEntry';

// import { journal_constant } from '../../data/text_contents';

const Journal = ({component}) => {
    // component.children 
    const { components } = useContext(PageContext);

    const { title } = component;
    return (
        <div>
            <div className={styles.description}>
                {title}
            </div>

            {component.children
                .map(id =>
                <JournalEntry 
                    key={id} 
                    id={id}
                    entry={components[id]}/>)
            }
        </div>
    )
}

export default Journal;
