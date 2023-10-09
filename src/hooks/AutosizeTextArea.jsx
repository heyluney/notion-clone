import { useEffect } from 'react';

export const useAutosizeTextArea = (idx, ref, value, commentBeingEdited) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "0px";
            ref.current.style.height = commentBeingEdited === idx ?  
                (ref.current.scrollHeight + 30) + "px" : ref.current.scrollHeight + "px";
        }
    }, [ref, value, commentBeingEdited]);
}

// This hook allows the text area to automatically be sized to fit the 
// text content inside. If this is not used, the text area will have a scroll.
export const useAutosizeDefaultTextArea = (ref) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "0px";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }, [ref]);
}