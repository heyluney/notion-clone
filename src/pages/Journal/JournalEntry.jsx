import { useContext } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';

import { PageContext } from '../../App';
import Tags from '../../components/tags/Tags';

import { findTags, findEmoji } from '../../data/pages_helper_functions';
import Header from '../../components/title/Header';

const JournalEntry = ({ id, journal }) => {
    const { emojis, tags, journals, changeActiveEntity, changeSlideOutWidth } = useContext(PageContext);

    // const journalEntryTags = findTags(tags, "journals", id);

    return (
        <div className={styles.journal_entry}
            onClick={() => {
                changeActiveEntity(journals[id]);
                changeSlideOutWidth(500);
                }}>
            <div className={styles.left}>
                <Header 
                            emoji={findEmoji(emojis, "journals", id)}
                            title={journal.title}

                            isSmall={true} 
                            isTruncated={true}/>
            </div>
                    
            {/* <div className={styles.middle}>
                <Tags tags={journalEntryTags} />
            </div> */}
            <div className={styles.right}>
                {getFullTimeString(journal.timestamp)}
            </div>
        </div>
    )
}

export default JournalEntry;