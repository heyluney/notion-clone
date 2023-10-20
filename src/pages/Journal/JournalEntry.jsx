import { useContext, useRef } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';
import Icon from '../../components/popups/Icon';

import { PageContext } from '../../App';
import Tags from '../../components/tags/Tags';

import { FaComments as Comments } from 'react-icons/fa6';

const JournalEntry = ({ idx, entry }) => {
    const { title, emoji, tags, timestamp, comments } = entry;

    const { component, changeComponent } = useContext(PageContext);

    const iconRef = useRef();
    return (
        <div onClick={
            (e) => {
                if (iconRef && 
                    iconRef.current && 
                    iconRef.current.contains(e.target)) {
                        return;
                    }
                changeComponent({
                    id: idx,
                    type: "journal_slideout",
                    popups: {
                        ...component.popups,
                        slideout: true
                    }
                })
            }}
            className={styles.journal_entry}>
                <div className={`${styles.title} 
                ${Object.keys(tags).length > 0 ? 
                        styles.title_with_tags : null}`}>
                    <div ref={iconRef} onClick={() => {
                        changeComponent({
                            id: component.id === null ? idx : null, 
                            type: component.type === null ? "journal" : null,
                            popups: {
                                ...component.popups,
                                emoji: !component.popups.emoji
                            }
                        })
                    }}>
                        <Icon 
                            icon={emoji}
                            component={component}
                            value={`journal_${idx}`}
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