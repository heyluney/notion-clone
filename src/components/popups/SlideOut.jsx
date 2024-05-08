import { useState, useRef, useContext } from 'react';

import styles from './SlideOut.module.css';

import { PageContext } from "../../App";
import { BiSolidChevronsRight as Chevron } from 'react-icons/bi';

import { useSlideOutOutsideAlerter } from '../../hooks/OutsideSlideOutAlert';

import SlideOutView from '../views/SlideOutView';


const SlideOut = () => {
    const {slideOutWidth, changeSlideOutWidth} = useContext(PageContext);
    const [slideOutTransitionTime, changeSlideOutTransitionTime] = useState(300);
    // const [slideOutWidth, changeSlideOutWidth] = useState(500);

    const wrapperRef = useRef();
    useSlideOutOutsideAlerter(wrapperRef, changeSlideOutTransitionTime, changeSlideOutWidth);

    return (
        <div ref={wrapperRef}
            style={{
                width: `${slideOutWidth}px`,
                transition: `${slideOutTransitionTime}ms`
            }}
            className={styles.slideout}>

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
                <Chevron onClick={() => {
                    changeSlideOutTransitionTime(300);
                }} />
                <SlideOutView />
            </div>

        </div>
    )
}

export default SlideOut;