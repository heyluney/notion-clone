import { useContext } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';
import Icon from '../../components/popups/Icon';

import { SlideOutContext } from '../../App';
import Tags from './Tags';

const JournalEntry = ({ idx, entry }) => {
    const { slideOut, toggleSlideOut, togglePhysicalSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } = entry;
    console.log('tags', tags)
    return (
        <div onClick={
            () => {
                if (slideOut === null) {
                    toggleSlideOut(idx);
                    togglePhysicalSlideOut(true);
                }
            }}
            className={styles.journal_entry}>
                <div className={`${styles.title} 
                ${Object.keys(tags).length > 0 ? 
                        styles.title_with_tags : null}`}>
                    <Icon icon={emoji}
                        component={`${"Journal"}_${idx}`}
                    />
                    <div className={styles.journal_entry_title}>
                        {title}
                    </div>
                </div>
                <div className={styles.tags}>
                    <Tags tags={tags} journalIdx={parseInt(idx)}/>
                </div>
                <div className={styles.timestamp}>
                        {getFullTimeString(timestamp)}
                </div>
        </div>
    )
}

export default JournalEntry;