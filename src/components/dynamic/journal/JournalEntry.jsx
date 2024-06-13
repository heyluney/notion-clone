import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../../utils/calculate_date';

import Tags from '../tags/Tags';

import Header from '../../static/header/Header';

const JournalEntry = ({ idx, entry, changeDropEntryIdx, changeDraggedEntryId }) => {
    
    // onClick={() => {
    //     // changeActiveEntity(journals[id]);
    //     // changeSlideOutWidth(500);
    //     }}
    return (
        <div className={styles.journal_entry}
            draggable={true}
            onDragOver={(e) =>  {
                e.preventDefault()
                changeDropEntryIdx(idx)
            }}
            onDrag={(e) => {
                e.preventDefault();
                changeDraggedEntryId(entry.id);
            }}
           >
            <div className={styles.left}>
                <Header 
                            emoji={entry.emoji}
                            title={entry.title}

                            isSmall={true} 
                            isTruncated={true}/>
            </div>
                    
            <div className={styles.middle}>
                <Tags tags={entry.tags} />
            </div>
            <div className={styles.right}>
                {getFullTimeString(entry.timestamp)}
            </div>
        </div>
    )
}

export default JournalEntry;