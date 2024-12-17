import { useState } from "react";

// Specifies hovering behaviors. For each handler, e.stopPropagation() is used so that at most one handler fires element - the innermost child element.
const useHoverable = () => {
    const [hoverableState, toggleHoverableState] = useState(false);

    const handleMouseEnter = (e) => {
        e.stopPropagation();
        toggleHoverableState(true) 
    }
    const handleMouseLeave = (e) => { 
        e.stopPropagation();
        toggleHoverableState(false) 
    }

    return { 
        hoverableState, 
        hoverableStateHandlers: {
            handleMouseEnter, 
            handleMouseLeave,
        }};
}

export default useHoverable;