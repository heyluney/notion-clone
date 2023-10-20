import { useEffect, useContext } from 'react';

import { PageContext } from '../App';
// It seems that a timeout is necessary because scrollHeight is not immediately
// accurate upon first render.
// (https://stackoverflow.com/questions/49345734/react-element-scrollheight-in-componentdidmount-is-wrong)

// However, it leads to a bit of "stuttering" behavior, where the resize is obvious.
export const useAutosizeTextArea = (idx, ref, value) => {
    const { component } = useContext(PageContext);
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.height = "0px";
                ref.current.style.height = component.id === idx ?  
                    (ref.current.scrollHeight + 30) + "px" : ref.current.scrollHeight + "px";
            }
        }, 0)

    }, [ref, value, component, idx]);
}
// This hook allows the text area to automatically be sized to fit the 
// text content inside. If this is not used, the text area will have a scroll.
export const useAutosizeDefaultTextArea = (ref) => {
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.height = "0px";
                ref.current.style.height = ref.current.scrollHeight + "px";
            }
        }, 1500);
    }, [ref]);
}