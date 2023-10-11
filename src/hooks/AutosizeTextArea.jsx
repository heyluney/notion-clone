import { useEffect } from 'react';

// It seems that a timeout is necessary because scrollHeight is not immediately
// accurate upon first render.
// (https://stackoverflow.com/questions/49345734/react-element-scrollheight-in-componentdidmount-is-wrong)

// However, it leads to a bit of "stuttering" behavior, where the resize is obvious. 

export const useAutosizeTextArea = (idx, ref, value, commentBeingEdited) => {
    useEffect(() => {
        // ref.current.style.transition = "1s";
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.height = "0px";
                ref.current.style.height = commentBeingEdited === idx ?  
                    (ref.current.scrollHeight + 30) + "px" : ref.current.scrollHeight + "px";
                // ref.current.style.transition = "800ms";
            }
        }, 800)

    }, [ref, value, commentBeingEdited]);
}
// This hook allows the text area to automatically be sized to fit the 
// text content inside. If this is not used, the text area will have a scroll.
export const useAutosizeDefaultTextArea = (ref) => {
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.height = "0px";
                ref.current.style.height = ref.current.scrollHeight + "px";
                // ref.current.style.transition = "800ms";
            }
        }, 800);
    }, [ref]);
}