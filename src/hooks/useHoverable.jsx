import { useState } from "react";

// Specifies hovering behaviors.
const useHoverable = () => {
    const [hoverableState, toggleHoverableState] = useState(false);

    const handleMouseEnter = () => { toggleHoverableState(true) }
    const handleMouseLeave = () => { toggleHoverableState(false) }

    return { 
        hoverableState, 
        hoverableStateHandlers: {
            handleMouseEnter, 
            handleMouseLeave 
        }};
}

export default useHoverable;