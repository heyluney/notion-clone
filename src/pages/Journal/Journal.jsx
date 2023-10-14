
import { useContext, Fragment } from 'react';

import Title from '../../components/title/Title';
import styles from './Journal.module.css';

import { PageContext } from '../../App';
import SlideOut from '../../components/popups/SlideOut';

import JournalEntry from './JournalEntry';
const Journal = () => {
    const { pages, currentPageName } = useContext(PageContext);
    const journalEntries = pages[currentPageName].entries;

    return (
        <Fragment>
        <div className={styles.journal}>
            <Title horizontal={true} />

            <div className={styles.description}>
                Document your life - daily happenings, special occasions, and reflections on your goals. Categorize entries with tags and automatically capture the date.
            </div>
            <div className={styles.journal_entries}>
                {Object.entries(journalEntries)
                    .map(([idx, entry]) => {
                        return (
                                <JournalEntry 
                                    key={idx}
                                    idx={idx}
                                    entry={entry}/>
                        )
                    }
                )}
            </div>
            
        </div>
        <SlideOut type="journal"/> 
        </Fragment>
    )
}

export default Journal;
