import styles from './EmojiSelector.module.css';

import { useContext } from 'react';
import { PageContext } from '../../App';

const EmojiSelector = () => {
    const {pages, changePages} = useContext(PageContext);
    const [allPages, active] = pages;

    const emojis = ["0x1F32E", "0x1F32F"];
    const emojis2 = ["0x1F957", "0x1F371"];
    return (
        <div className={styles.emoji}>
            <div className={styles.types}>

            </div>
            <div className={styles.row}>
                {emojis.map(emoji => 
                <div key={emoji} onClick={() => {
                    const newPage = {[active]: allPages[active].map((x, idx) => {
                        if (idx == 2) {
                            return emoji;
                        } else {
                            return x;
                        }
                    })};
                    changePages([{...allPages, ...newPage}, active]);
                }}>
                    {String.fromCodePoint(emoji)}
                </div>)}
            </div>
            <div className={styles.row}>
                {emojis2.map(emoji => 
                    <div key={emoji} onClick={() => {
                        const newPage = {[active]: allPages[active].map((x, idx) => {
                            if (idx == 2) {
                                return emoji;
                            } else {
                                return x;
                            }
                        })};
                        changePages([{...allPages, ...newPage}, active]);
                    }}>
                        {String.fromCodePoint(emoji)}
                    </div>)}
            </div>
        </div>
    )
}

export default EmojiSelector;