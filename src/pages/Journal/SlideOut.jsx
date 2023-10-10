import { useContext, useRef } from 'react';

import styles from './SlideOut.module.css';
import { SlideOutContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';
import { getFullTimeString } from '../../utils/calculate_date';
import Tags from './Tags';
import Title
 from '../../components/title/Title';

 import { useSlideOutOutsideAlerter } from '../../hooks/OutsideAlert';

const SlideOut = () => {
    const { slideOut, toggleSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } 
        = slideOut === null ? {} : slideOut;

    const wrapperRef = useRef();
    useSlideOutOutsideAlerter(wrapperRef);

    return (
        <div ref={wrapperRef} 
            className={`${styles.slideout} 
                ${slideOut === null ? null : styles.active}`}>
            <Chevron onClick = {() => toggleSlideOut(null)}/>

            {slideOut !== null &&
                <div className={styles.main}>
                <Title horizontal={true} 
                    title={title} 
                    emoji={emoji}
                    type={"journal"} />

                <div className={styles.desc}>
                    <div className={styles.desc_item}>Date Created</div>
                    <div className={styles.desc_item}>{getFullTimeString(timestamp)}</div>
                    <div className={styles.desc_item}>Tags</div>
                    <Tags tags={tags} full={true}/>
                </div>
            </div>}
        </div>
    )
}

export default SlideOut;