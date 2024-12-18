import { useState, useEffect } from "react";

// Enables component to be slideable, within [minWidth, maxWidth] range.
const useSlideable = (ref, minWidth=100, maxWidth=500) => {
    const [width, changeWidth] = useState(300);
    const [isSliding, setIsSliding] = useState(false);

    const handleMouseDown = () => {
        setIsSliding(true);
    }

    const handleMouseMove = (e) => {
        if (!isSliding) return;
        if (e.clientX < minWidth || e.clientX > maxWidth) return; 
        changeWidth(e.clientX + 1.5);
    }

    const handleMouseUp = () => {
        setIsSliding(false);
    }

    // Adds click event handler when the component mounts, and removes this event handler when the component unmounts.
    useEffect(() => {
        ref.current.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    
        return () => {
         ref.current.removeEventListener('mousedown', handleMouseDown);
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [width, isSliding]);

    return { width, isSliding };
}

export default useSlideable;