import { useContext } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';

import { PageContext } from '../../App';
import Tags from '../../components/tags/Tags';

import { findTags } from '../../data/pages_helper_functions';

const JournalEntry = ({ id, journal }) => {
    const { tags, changeActiveEntityId, changeSlideOutWidth } = useContext(PageContext);

    const journalEntryTags = findTags(tags, 'journal', id);

    return (
        <div className={styles.journal_entry}
            onClick={() => {
                changeActiveEntityId(id);
                changeSlideOutWidth(500);
                }}>
            <div className={styles.left}>
                <div className={styles.title}>
                    {journal.journal}
                </div>
                <Tags tags={journalEntryTags} />
            </div>
            <div className={styles.date}>
                {getFullTimeString(journal.timestamp)}
            </div>
        </div>
    )
}

export default JournalEntry;