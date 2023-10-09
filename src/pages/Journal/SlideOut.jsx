import { useContext } from 'react';

import styles from './SlideOut.module.css';
import { SlideOutContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';
import getTimeString from '../../utils/calculate_time_elapsed';
import Tags from './Tags';
import Title
 from '../../components/title/Title';
const SlideOut = () => {
    const { slideOut, toggleSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } 
        = slideOut === null ? {} : slideOut;

    return (
        <div className={`${styles.slideout} ${slideOut === null ? null : styles.active}`}>
            <Chevron onClick = {() => toggleSlideOut(null)}/>

            {slideOut !== null ? <div className={styles.main}>
                <Title horizontal={true} title={title} emoji={emoji} />
                <div className={styles.desc}>
                    <div className={styles.desc_item}>Date Created</div>
                    <div className={styles.desc_item}>{getTimeString(timestamp)}</div>
                    <div className={styles.desc_item}>Tags</div>
                    <Tags tags={tags}/>
                </div>
            </div> : null}
        </div>
    )
}

export default SlideOut;