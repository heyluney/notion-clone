import { useEffect } from 'react';

const useOutsideCommentAlerter = (ref, toggleComment) => {
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            toggleComment(-1);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

export default useOutsideCommentAlerter;