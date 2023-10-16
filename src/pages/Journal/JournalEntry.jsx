import { useContext, useRef } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';
import Icon from '../../components/popups/Icon';

import { SlideOutContext } from '../../App';
import Tags from '../../components/tags/Tags';

import { FaComments as Comments } from 'react-icons/fa6';

const JournalEntry = ({ idx, entry }) => {
    const { slideOut, toggleSlideOut, togglePhysicalSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp, comments } = entry;

    const iconRef = useRef();
    return (
        <div onClick={
            (e) => {
                if (iconRef && 
                    iconRef.current && 
                    iconRef.current.contains(e.target)) return;
                if (slideOut === null) {
                    toggleSlideOut(idx);
                    togglePhysicalSlideOut(true);
                }
            }}
            className={styles.journal_entry}>
                <div className={`${styles.title} 
                ${Object.keys(tags).length > 0 ? 
                        styles.title_with_tags : null}`}>
                    <div ref={iconRef}>
                    <Icon 
                        icon={emoji}
                        component={`${"Journal"}_${idx}`}
                    />
                    </div>
                    <div className={styles.journal_entry_title}>
                        {title}
                    </div>
                </div>
                <div className={styles.comments}>
                    <Comments />
                    <div className={styles.number}>
                        {Object.keys(comments).length}
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