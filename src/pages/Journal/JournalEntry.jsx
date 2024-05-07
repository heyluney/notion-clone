import { useContext, useRef } from 'react';
import styles from './JournalEntry.module.css';

import { getFullTimeString } from '../../utils/calculate_date';
import Icon from '../../components/popups/Icon';

import { PageContext } from '../../App';
import Tags from '../../components/tags/Tags';

import { FaComments as Comments } from 'react-icons/fa6';

const JournalEntry = ({journal}) => {
    return (

        <div className={styles.journal_entry}>
                <div>
                    <div className={styles.journal_entry_title}>
                        {journal.journal}
                    </div>
                </div>
                <div className={styles.comments}>
                    {/* <Comments /> */}
                    {/* <div className={styles.number}>
                        {Object.keys(comments).length}
                    </div> */}
                </div>
                <div className={styles.tags}>
                    {/* <Tags tags={tags} journalIdx={parseInt(idx)}/> */}
                </div>
                <div className={styles.timestamp}>
                        {getFullTimeString(journal.timestamp)}
                </div>
        </div>
    )
}

export default JournalEntry;