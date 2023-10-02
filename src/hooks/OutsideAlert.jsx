import { useEffect } from 'react';
// if (event.target.className.includes('Icon')) return;

// If we detect a click outside the popup (event.target location is not contained)
// in ref.current, which is the popup -> then we trigger the popup to be closed.
export const useOutsideAlerter = (ref, togglePopup, overlay) => {
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            togglePopup(-1);
            document.getElementById(overlay).style.display = "none";
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export default useOutsideAlerter;
