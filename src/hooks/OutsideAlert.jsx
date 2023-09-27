import { useEffect } from 'react';


export const useOutsideEmojiAlerter = (ref, toggleEmojiPopup) => {
    const handleClickOutside = event => {
        if (event.target.className.includes('Icon')) return;
        if (ref.current && !ref.current.contains(event.target)) {
            toggleEmojiPopup(-1);
            document.getElementById('overlay2').style.display = "none";
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
