import { useEffect } from 'react';

export const useSlideOutOutsideAlerter = (ref, changeSlideOutTransitionTime, changeSlideOutWidth) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                changeSlideOutTransitionTime(300);
                changeSlideOutWidth(0);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, changeSlideOutTransitionTime]);
}
