import { useState, useEffect, useMemo } from 'react';

// Allows the "hovered over" effect to be applied to the correct emoji category
// when the category is scrolled to.
const useOnScreen = categoryRefs => {
    const [isIntersecting, setIntersecting] = useState("")

    const observer =  useMemo(() => new IntersectionObserver(observerCallback, {}), 
        [/*categoryRefs*/]);

    function observerCallback(entries, _) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target.innerHTML;
                const refinedCategory = category
                    .split(' ')
                    .map(x => x === "&amp;" ? "&" : x)
                    .join(' ');
                setIntersecting(refinedCategory)
            } else {
                setIntersecting("No intersection exists.")
            }
        })
    }
  
    useEffect(() => {
        // const keys = Object.keys(categoryRefs.current);
        for (let category in categoryRefs.current) {
            if (categoryRefs.current[category] !== null) {
                observer.observe(categoryRefs.current[category])
            }
        }
        return () => observer.disconnect()
    }, [isIntersecting, categoryRefs, observer])
  
    return isIntersecting;
  }

  export default useOnScreen;