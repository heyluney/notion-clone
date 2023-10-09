
import { useContext} from 'react';

import Title from '../../components/title/Title';
import styles from './Journal.module.css';

import { PageContext } from '../../App';

import JournalEntry from './JournalEntry';
const Journal = () => {
    const { pages } = useContext(PageContext);
    const journalEntries = pages['Journal'].entries;

    return (
        <div className={styles.journal}>
            <Title horizontal={true} />

            <div className={styles.journal_entries}>
                {Object.entries(journalEntries)
                    .map(([idx, entry]) => 
                    <JournalEntry 
                        key={idx}
                        idx={idx}
                        entry={entry}/>
                )}
            </div>
        </div>
    )
}

export default Journal;
