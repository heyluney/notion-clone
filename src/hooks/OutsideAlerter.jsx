import { useEffect } from "react";

// Detects when there is a click outside of a component (through a passed reference).
const useOutsideAlerter = (ref, changeEditableId) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                changeEditableId(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    }, [ref])
}

export default useOutsideAlerter;