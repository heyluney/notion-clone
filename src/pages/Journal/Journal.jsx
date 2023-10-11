
import { useContext, Fragment } from 'react';

import Title from '../../components/title/Title';
import styles from './Journal.module.css';

import { PageContext } from '../../App';
import SlideOut from './SlideOut';

import JournalEntry from './JournalEntry';
const Journal = () => {
    const { pages, currentPageName } = useContext(PageContext);
    const journalEntries = pages[currentPageName].entries;

    return (
        <Fragment>
        <div className={styles.journal}>
            <Title horizontal={true} />

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
        <SlideOut/> 
        </Fragment>
    )
}

export default Journal;
