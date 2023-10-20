import { useContext, useEffect } from 'react';

import { PageContext } from '../App';


export const useSlideOutOutsideAlerter = (ref, changeSlideOutTransitionTime) => {
    const { component, changeComponent } = useContext(PageContext);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                changeSlideOutTransitionTime(300);
                changeComponent({
                    id: null,
                    type: null,
                    popups: {
                        ...component.popups,
                        slideout: false
                    }
                })
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, changeSlideOutTransitionTime, component, changeComponent]);
}
