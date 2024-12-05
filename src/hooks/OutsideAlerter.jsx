import { useEffect } from "react";

// Detects when there is a click outside of a component (through a passed reference).
const useOutsideAlerter = (ref, updateActiveComponent) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                updateActiveComponent(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
    }, [ref])
}

export default useOutsideAlerter;