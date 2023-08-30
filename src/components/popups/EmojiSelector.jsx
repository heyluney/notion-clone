import { useContext, useRef } from 'react';

import styles from './EmojiSelector.module.css';
import { PageContext } from '../../App';

import { saveItem } from '../../utils/local_storage';

import { useOutsideEmojiAlerter } from '../../hooks/OutsideAlert';

const EmojiSelector = ({updateDisplayEmoji}) => {
    const {pages, changePages} = useContext(PageContext);
    const [allPages, active] = pages;

    const emojis = ["0x1F32E", "0x1F32F"];
    const emojis2 = ["0x1F957", "0x1F371"];

    const wrapperRef = useRef();
    useOutsideEmojiAlerter(wrapperRef, updateDisplayEmoji);
    return (
        <div className={styles.emoji}
            ref={wrapperRef}>
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
                        const newPage = {
                        [active]: allPages[active].map((x, idx) => idx == 2 ? emoji : x)
                        };
                        const newState = [{...allPages, ...newPage}, active];
                        changePages(newState);
                        saveItem('pages', newState);
                    }}>
                        {String.fromCodePoint(emoji)}
                    </div>)}
            </div>
        </div>
    )
}

export default EmojiSelector;