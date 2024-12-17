import { useState, useEffect } from "react";

import useDebouncer from "./useDebouncer";

// Specifies hovering behaviors. For each handler, e.stopPropagation() is used so that at most one handler fires element - the innermost child element.
const useHoverable = () => {
    const [hoverableState, toggleHoverableState] = useState(false);

    const handleMouseEnter = (e) => {
        e.stopPropagation();
        toggleHoverableState(true);
    }
    
    const handleMouseLeave = (e) => {
        e.stopPropagation();
        toggleHoverableState(false);
    }

    // Debouncing is necessary in order to ensure only one handler fires at a time if the user mouses over the sidebar very quickly.
    return { 
        hoverableState, 
        hoverableStateHandlers: {
            handleMouseEnter: handleMouseEnter,
            handleMouseLeave: handleMouseLeave
        }};
}

export default useHoverable;