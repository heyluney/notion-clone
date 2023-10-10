import { useEffect, useContext } from 'react';
import { SlideOutContext } from '../App';

export const useAutosizeTextArea = (idx, ref, value, commentBeingEdited) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "0px";
            ref.current.style.height = commentBeingEdited === idx ?  
                (ref.current.scrollHeight + 30) + "px" : ref.current.scrollHeight + "px";
        }
    }, [ref, value, commentBeingEdited]);
}

// It seems that a timeout is necessary because scrollHeight is not immediately
// accurate upon first render.
// (https://stackoverflow.com/questions/49345734/react-element-scrollheight-in-componentdidmount-is-wrong)

// This hook allows the text area to automatically be sized to fit the 
// text content inside. If this is not used, the text area will have a scroll.
export const useAutosizeDefaultTextArea = (ref) => {
    useEffect(() => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.style.height = "0px";
                ref.current.style.height = ref.current.scrollHeight + "px";
            }
        }, 1000);
    }, [ref]);
}