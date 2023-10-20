import { useEffect, useContext } from 'react';

import { PageContext } from '../App';

const useOutsideCommentAlerter = (ref) => {
    const { component, changeComponent } = useContext(PageContext);
    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            changeComponent({
                id: null,
                type: null,
                popups: {
                    ...component.popups
                }
            })
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}

export default useOutsideCommentAlerter;