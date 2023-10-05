import { useEffect } from 'react';

const useAutosizeTextArea = (idx, ref, value, commentBeingEdited) => {
    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = "0px";
            ref.current.style.height = commentBeingEdited === idx ?  
                (ref.current.scrollHeight + 30) + "px" : ref.current.scrollHeight + "px";
        }
    }, [ref, value, commentBeingEdited]);
}

export default useAutosizeTextArea;