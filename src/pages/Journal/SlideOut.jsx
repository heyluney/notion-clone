import { useState, useContext, useRef } from 'react';

import styles from './SlideOut.module.css';

import Comments from '../../components/comment/Comments';
import { SlideOutContext, PageContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';
import { getFullTimeString } from '../../utils/calculate_date';
import Tags from './Tags';
import Title
 from '../../components/title/Title';

 import { useSlideOutOutsideAlerter } from '../../hooks/OutsideAlert';

const SlideOut = () => {
    const { pages, currentPageName } = useContext(PageContext);
    const { slideOut, toggleSlideOut } = useContext(SlideOutContext);
    const { title, emoji, tags, timestamp } 
        = slideOut === null ? {} : pages[currentPageName].entries[slideOut];

    const wrapperRef = useRef();
    useSlideOutOutsideAlerter(wrapperRef);

    const [slideOutWidth, changeSlideOutWidth] = useState(500);
    const [transitionTime, changeTransitionTime] = useState(300);

    return (
        <div ref={wrapperRef}
            style={slideOut !== null ? {
                width: `${slideOutWidth}px`,
                transition: `${transitionTime}ms`,
            } : {
                transition: `${transitionTime}ms`
            }}
            className={`${styles.slideout} 
                ${slideOut === null ? null : styles.active}`}>

            <div className={styles.draggable}       
                draggable={true}
                onDrop = {() => changeTransitionTime(300)}
                onDrag={(e) => {
                    // e.clientX is 0 if the mouse goes off screen (e.g. vertically).
                    // This is a severe jump, so we return to avoid the jumpy effect
                    // of slideOutWidth extending to maximum.
                    if (e.clientX === 0) return;

                    e.stopPropagation();
                    const newSlideOutWidth = window.screen.width - e.clientX + 2.5;
                    changeSlideOutWidth(newSlideOutWidth);

                    // Normally this is 300ms to imitate a "slide out" animation.
                    // However, we want to make the transition time 0 during manually
                    // dragging, to eliminate lag.
                    changeTransitionTime(0);
                }}
                onDragOver={(e) => e.preventDefault()}
            >
            </div>
            <div className={styles.right}>
                <Chevron onClick = {() => toggleSlideOut(null)}/>

                {slideOut !== null &&
                    <div className={styles.main}>
                    <Title horizontal={true} 
                        title={title} 
                        emoji={emoji}
                        type="journal" />

                    <div className={styles.desc}>
                        <div className={styles.desc_item}>Date Created</div>
                        <div className={styles.desc_item}>{getFullTimeString(timestamp)}</div>
                        <div className={styles.desc_item}>Tags</div>
                        <Tags tags={tags} full={true} addTagsShown={true}/>
                    </div>

                    <Comments className={styles.comments} 
                            passedComments={pages[currentPageName].entries[slideOut].comments}
                            type="journal_comments"/>
                </div>}
            </div>


        </div>
    )
}

export default SlideOut;