
import { useContext } from 'react';

import styles from './Journal.module.css';

import JournalEntry from './JournalEntry';

// import { journal_constant } from '../../data/text_contents';

const Journal = ({component, subComponents}) => {

    return (
        <div>
            <div className={styles.description}>
                {/* {journal_constant} */}
                This is the journal
            </div>

            {subComponents
                .map(([idx, subComponent]) =>
                <JournalEntry 
                    key={idx} 
                    id={idx}
                    journal={subComponent}/>)
            }
        </div>
    )
}

export default Journal;
