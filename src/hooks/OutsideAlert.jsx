import { useEffect } from 'react';


export const useOutsideEmojiAlerter = (ref, toggle) => {
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            toggle(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


const useOutsideAlerter = (ref, togglePopup) => {
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            togglePopup(-1);
            document.getElementById('overlay').style.display = "none";
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
