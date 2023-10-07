
import { useState, useRef, createElement } from 'react';

import Title from '../../components/title/Title';
import styles from './Journal.module.css';

const Journal = () => {
    const journalRef = useRef();
    const captureText = () => {
        if (journalRef.current) {
            console.log(journalRef.current.textContent)
        }
    }

    return (
        <div className={styles.journal}>
            <div className={styles.left}>
                <Title horizontal={true} />
                <div className={styles.list} 
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    ref={journalRef}
                    onInput={captureText}
                    >
                    Todo placeholder. Lorem ipsum.
                </div>
            </div>
            {/* <div className={styles.right}>Right sliding</div> */}
        </div>
    )
}

export default Journal;