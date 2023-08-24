import { useEffect } from 'react';

const useOutsideAlerter = (ref, togglePopup) => {
    useEffect(() => {
        const handleClickOutside = event => {
            if (ref.current && !ref.current.contains(event.target)) {
                togglePopup(false);
                document.getElementById('overlay').style.display = "none";
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export default useOutsideAlerter;