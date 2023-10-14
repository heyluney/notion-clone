import { useState, useContext, useRef } from 'react';

import styles from './SlideOut.module.css';

import Comments from '../comments/Comments';
import { SlideOutContext, PageContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';
import { getFullTimeString } from '../../utils/calculate_date';
import Tags from '../tags/Tags';
import Title
 from '../title/Title';

 import { useSlideOutOutsideAlerter } from '../../hooks/OutsideAlert';

const SlideOut = ({type}) => {
    const { pages, currentPageName } = useContext(PageContext);
    const { slideOut, toggleSlideOut,
            physicalSlideOut, togglePhysicalSlideOut,
            slideOutTransitionTime, changeSlideOutTransitionTime} = useContext(SlideOutContext);
    
    let entry;
    switch(type) {
        case 'journal': 
            entry = slideOut === null ? {} : pages[currentPageName].entries[slideOut];
            break;
        case 'tasklist': 
            entry = slideOut === null ? {} : pages[currentPageName].todos[category][slideOut];
            break;
        default: 
            entry = {}
            break;
    }

    const { title, emoji, tags, timestamp } = entry;

    const [slideOutWidth, changeSlideOutWidth] = useState(500);

    const wrapperRef = useRef();
    useSlideOutOutsideAlerter(wrapperRef);
 
    // tags part is optional, but comments still exist
    // {title, emoji, timestamp}
    return (
        <div ref={wrapperRef}
            style={physicalSlideOut !== false ? {
                width: `${slideOutWidth}px`,
                transition: `${slideOutTransitionTime}ms`,
            } : {
                width: `0px`,
                transition: `${slideOutTransitionTime}ms`
            }}
            className={`${styles.slideout} 
                ${physicalSlideOut === false ? null : styles.active}`}>

            <div className={styles.draggable}       
                draggable={true}
                onDrag={(e) => {
                    // e.clientX is 0 if the mouse goes off screen (e.g. vertically).
                    // This is a severe jump, so we return to avoid the jumpy effect
                    // of slideOutWidth extending to maximum.
                    if (e.clientX === 0) return;

                    e.stopPropagation();
                    const newSlideOutWidth = window.screen.width - e.clientX + 2.5;

                    // Want the slide out to have a minimum width of 500.
                    if (newSlideOutWidth < 500) return;
                    changeSlideOutWidth(newSlideOutWidth);

                    // Normally this is 300ms to imitate a "slide out" animation.
                    // However, we want to make the transition time 0 during manually
                    // dragging, to eliminate lag.
                    changeSlideOutTransitionTime(0);
                }}
                onDragOver={(e) => e.preventDefault()}
            >
            </div>
            <div className={styles.right}>
                <Chevron onClick = {() => {
                    changeSlideOutTransitionTime(300);
                    setTimeout(() => toggleSlideOut(null), slideOutTransitionTime);
                    togglePhysicalSlideOut(false);
                }}/>

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

                    {entry.comments && <Comments className={styles.comments} 
                            passedComments={entry.comments}
                            type="journal_comments"/>}
                </div>}
            </div>


        </div>
    )
}

export default SlideOut;