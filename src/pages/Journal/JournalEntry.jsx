import { useContext } from 'react';
import styles from './JournalEntry.module.css';

import getTimeString from '../../utils/calculate_time_elapsed';
import Icon from '../../components/popups/Icon';

import { SlideOutContext } from '../../App';
import Tags from './Tags';
const JournalEntry = ({ idx, entry }) => {
    const { slideOut, toggleSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } = entry;
    return (
        <div onClick={() =>
                toggleSlideOut(entry)}
            className={styles.journal_entry}>
            <div className={styles.left}>
                <Icon icon={emoji}
                    component={`${"Journal"}_${idx}`}
                    relatedToComments={false}
                />
                <div
                    className={styles.journal_entry_title}>
                    {title}
                </div>
            </div>
            <div className={styles.right}>
                <Tags tags={tags} />
                <div className={styles.timestamp}>{getTimeString(timestamp)}</div>
            </div>
        </div>
    )
}

export default JournalEntry;