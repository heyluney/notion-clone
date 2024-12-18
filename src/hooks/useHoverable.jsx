import { useState, useCallback, useMemo, useContext } from "react";
import { PageContext } from "../App";

// (todo: Try to understand how to use debouncer with this effect, as it currently seems buggy.) Debouncing is necessary in order to ensure only one handler fires at a time if the user mouses over the sidebar very quickly.
import useDebouncer from "./useDebouncer";

// Specifies hovering behaviors. For each handler, e.stopPropagation() is used so that at most one handler fires element - the innermost child element.
const useHoverable = () => {
    const [hoverState, updateHoverState] = useState(new Set());

    // const handleMouseEnter = (e, id) => {
    //     e.stopPropagation();
    //     // const {hoverState} = useContext(PageContext);
    //     console.log('Inside BUTTON this is hoverState', hoverState)
    //     updateHoverState(new Set([...hoverState, id]));
    // };
    
    // // If the parent component of the current component is also hoverable, updates hover state to be that component.
    // const handleMouseLeave = (e, id) => {
    //     e.stopPropagation();

    //     console.log('leaving')
    //     const updatedSet = new Set(hoverState);
    //     updatedSet.delete(id);
    //     updateHoverState(updatedSet);
    // };

    return [hoverState, updateHoverState];
}

export default useHoverable;