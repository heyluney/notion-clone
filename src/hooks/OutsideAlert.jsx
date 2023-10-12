import { useContext, useEffect } from 'react';

import { PopupContext, SlideOutContext } from '../App';


export const useSlideOutOutsideAlerter = ref => {
    const { togglePopup } = useContext(PopupContext);
    const { slideOut, toggleSlideOut } = useContext(SlideOutContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!slideOut) return;
            if (ref.current && !ref.current.contains(event.target)) {
                toggleSlideOut(null);
                togglePopup(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, slideOut, toggleSlideOut, togglePopup]);
}

// If we detect a click outside the popup (event.target location is not contained)
// in ref.current, which is the popup -> then we trigger the popup to be closed.
const useOutsideAlerter = ref => {
    const { popup, togglePopup } = useContext(PopupContext);

    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                if(typeof(event.target.className) === 'object') return;
    
                if (event.target && event.target.className.includes("Icon_main")) return;
    
                if (ref.current.className.includes('Popup') && popup && !popup.startsWith('Delete')) {
                    // Allows the non-interference of the two popups (otherwise popup will interfere)
                    // with emoji selector popup.
                    return;
                }
                togglePopup(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, popup, togglePopup]);
}

export default useOutsideAlerter;