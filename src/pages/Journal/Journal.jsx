
import { useContext } from 'react';

import styles from './Journal.module.css';

import { PageContext } from '../../App';

import Header from '../../components/title/Header';
import JournalEntry from './JournalEntry';

import SlideOut from '../../components/popups/SlideOut';
import { journal_constant } from '../../data/text_contents';

const Journal = () => {
    const { journal } = useContext(PageContext);
    return (
        <div>
            <Header />

            <div className={styles.description}>
                {journal_constant}
            </div>

            {Object.entries(journal)
                .map(([idx, journal]) =>
                <JournalEntry 
                    key={idx} 
                    id={idx}
                    journal={journal}/>)
            }
        </div>
    )
}

export default Journal;
