import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';

import Tags from '../../components/tags/Tags';

import Header from '../../components/title/Header';

const JournalEntry = ({ entry }) => {
    
    const { title, emoji, timestamp, tags } = entry;

    return (
        <div className={styles.journal_entry}
            onClick={() => {
                // changeActiveEntity(journals[id]);
                // changeSlideOutWidth(500);
                }}>
            <div className={styles.left}>
                <Header 
                            emoji={emoji}
                            title={title}

                            isSmall={true} 
                            isTruncated={true}/>
            </div>
                    
            <div className={styles.middle}>
                <Tags tags={tags} />
            </div>
            <div className={styles.right}>
                {getFullTimeString(timestamp)}
            </div>
        </div>
    )
}

export default JournalEntry;