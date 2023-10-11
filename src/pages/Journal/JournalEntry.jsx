import { useContext } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';
import Icon from '../../components/popups/Icon';

import { SlideOutContext } from '../../App';
import Tags from './Tags';
const JournalEntry = ({ idx, entry }) => {
    const { toggleSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } = entry;
    return (
        <div onClick={
            () => 
            toggleSlideOut(idx)}
            className={styles.journal_entry}>
            <div className={styles.left}>
                <Icon icon={emoji}
                    component={`${"Journal"}_${idx}`}
                />
                <div className={styles.journal_entry_title}>
                    {title}
                </div>
            </div>
            <div className={styles.right}>
                <Tags tags={tags} />
                <div className={styles.timestamp}>
                    {getFullTimeString(timestamp)}
                </div>
            </div>
        </div>
    )
}

export default JournalEntry;