
import { useContext } from 'react';

import styles from './Journal.module.css';

import { PageContext } from '../../App';

import Header from '../../components/title/Header';
import JournalEntry from './JournalEntry';

const Journal = () => {
    const { journal } = useContext(PageContext);
    return (
        <div>
            <Header />

            <div className={styles.description}>
                {blurb}
            </div>

            {Object.values(journal)
                .map((journal, idx) =>
                <JournalEntry 
                    key={idx} 
                    journal={journal}/>)
            }
        </div>
    )
}

const blurb = "Document your life - daily happenings, special occasions, and reflections on your goals. Categorize entries with tags and automatically capture the date.";

export default Journal;
