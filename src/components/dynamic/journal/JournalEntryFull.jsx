import styles from './JournalEntryFull.module.css';

// entity type and entity id 
const JournalEntryFull = () => {
    console.log('at journal entry full')
    return (
        <div className={styles.main}>
            This is the journal!!!
            {/* <Title title={entity.text} />

            <div className={styles.desc}>
                <div className={styles.desc_item}>Date Created</div>
                <div className={styles.desc_item}>{"timestamp"}</div>
            </div> */}
        </div>
    )
}

export default JournalEntryFull;



