import { useContext, useEffect } from 'react';

import { PageContext } from '../App';

const useOutsideEmojiAlerter = ref => {
    const { component, changeComponent } = useContext(PageContext);

    useEffect(() => {        
        const handleClickOutside = event => {
            if (component.popups.emoji === false) return;

            if (ref.current && !ref.current.contains(event.target)) {    
                if (event.target && event.target.className.includes("Icon_main")) return;
    
                changeComponent({
                    id: null,
                    type: null,
                    popups: {
                        ...component.popups,
                        emoji: false
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

export default useOutsideEmojiAlerter;