import { useState, useContext, useRef } from 'react';

import styles from './SlideOut.module.css';

import Comments from '../comments/Comments';
import { PageContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';
import { getFullTimeString } from '../../utils/calculate_date';
import Tags from '../tags/Tags';
import Title
 from '../title/Title';

 import { useSlideOutOutsideAlerter } from '../../hooks/OutsideSlideOutAlert';

const SlideOut = () => {
    const { pages, currentPageName, component, changeComponent } = useContext(PageContext);
    const { id, type, popups } = component;

    const { slideout } = popups;
    const retrieveEntry = () => {
        if (!slideout) return {};
        let entry;

        switch(type) {
            case 'journal_slideout': 
                entry = pages[currentPageName].entries[id];
                break;
            case 'tasklist': 
                entry = pages[currentPageName].todos[id];
                break;
            default: 
                entry = {}
                break;
        }
        return entry;
    }

    const entry = retrieveEntry();
    const { title, emoji, tags, timestamp } = entry;

    const [slideOutTransitionTime, changeSlideOutTransitionTime] = useState(300);
    const [slideOutWidth, changeSlideOutWidth] = useState(500);

    const wrapperRef = useRef();
    useSlideOutOutsideAlerter(wrapperRef, changeSlideOutTransitionTime);
 
    return (
        <div ref={wrapperRef}
            style={slideout ? {
                width: `${slideOutWidth}px`,
                transition: `${slideOutTransitionTime}ms`,
            } : {
                width: `0px`,
                transition: `${slideOutTransitionTime}ms`
            }}
            className={`${styles.slideout} 
                ${!slideout ? null : styles.active}`}>

            <div className={styles.draggable}       
                draggable={true}
                onDrag={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    // e.clientX is 0 if the mouse goes off screen (e.g. vertically). This is a severe jump, so we return to avoid the jumpy effect of slideOutWidth extending to maximum.
                    if (e.clientX === 0) return;

                    const newSlideOutWidth = window.screen.width - e.clientX + 2.5;

                    // Want the slide out to have a minimum width of 500.
                    if (newSlideOutWidth < 500) return;
                    changeSlideOutWidth(newSlideOutWidth);

                    // Normally this is 300ms to imitate a "slide out" animation. However, we want to make the transition time 0 during manually dragging, to eliminate lag.
                    changeSlideOutTransitionTime(0);
                    
                }}
                onDragOver={(e) => e.preventDefault()}
            >
            </div>
            <div className={styles.right}>
                <Chevron onClick = {() => {
                    changeSlideOutTransitionTime(300);
                    changeComponent({
                        id: null,
                        type: null,
                        popups: {
                            ...component.popups,
                            slideout: false 
                        }
                    })
                }}/>

                    <div className={styles.main}>
                    <Title horizontal={true} 
                        title={title} 
                        emoji={emoji} />

                    <div className={styles.desc}>
                        <div className={styles.desc_item}>Date Created</div>
                        <div className={styles.desc_item}>{getFullTimeString(timestamp)}</div>
                        <div className={styles.desc_item}>Tags</div>
                       <Tags tags={tags} full={true} addTagsShown={true}/>
                    </div>

                    {entry.comments && <Comments className={styles.comments} 
                            passedComments={entry.comments}
                            type="journal_comments"/>}

                </div>
            </div>

        </div>
    )
}

export default SlideOut;