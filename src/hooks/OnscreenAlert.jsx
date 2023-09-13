import { useState, useEffect, useMemo } from 'react';

export const useOnScreen = categoryRefs => {
    const [isIntersecting, setIntersecting] = useState("")

    const observer =  useMemo(() => new IntersectionObserver(observerCallback, {}), [categoryRefs]);

    function observerCallback(entries, _) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target.innerHTML;
                const refinedCategory = category
                    .split(' ')
                    .map(x => x == "&amp;" ? "&" : x)
                    .join(' ');
                setIntersecting(refinedCategory)
            } else {
                setIntersecting("No intersection exists.")
            }
        })
    }
  
    useEffect(() => {
        for (let category in categoryRefs.current) {
            if (categoryRefs.current[category] !== null) {
                observer.observe(categoryRefs.current[category])
            }
        }
        return () => observer.disconnect()
    }, [Object.keys(categoryRefs.current), isIntersecting])
  
    return isIntersecting;
  }