import { useContext, useEffect } from 'react';

import { PageContext } from '../App';


// If we detect a click outside the popup (event.target location is not contained)
// in ref.current, which is the popup -> then we trigger the popup to be closed.
const useOutsideModalAlerter = ref => {
    const { component, changeComponent } = useContext(PageContext);

    useEffect(() => {        
        const handleClickOutside = event => {
            if (component.popups.modal === false) return;
            if (ref.current && !ref.current.contains(event.target)) {
                if(typeof(event.target.className) === 'object') return;
    
                if (event.target && event.target.className.includes("Icon_main")) return;
    
                changeComponent({
                    id: null,
                    type: null,
                    popups: {
                        ...component.popups,
                        modal: false
                    }
                })
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, component, changeComponent]);
}

export default useOutsideModalAlerter;