import { useState, useEffect, useContext } from "react";

import { PageContext } from "../App";
// Enables component to be slideable, within [minWidth, maxWidth] range.
const useSlideable = (ref, minWidth = 100, maxWidth = 500) => {
    const { globalStyles, changeGlobalStyles } = useContext(PageContext);

    const [width, changeWidth] = useState(globalStyles.sideBarWidth);
    const [isSliding, setIsSliding] = useState(false);

    const handleMouseDown = () => {
        setIsSliding(true);
    }

    const handleMouseMove = (e) => {
        if (!isSliding) return;
        if (e.clientX < minWidth || e.clientX > maxWidth) return;
        // The +2 is half of the width of the side bar itself, to center it when moving.
        changeWidth(e.clientX + 2);
    }

    const handleMouseUp = () => {
        setIsSliding(false);
        changeGlobalStyles((prevStyles) => ({ ...prevStyles, sideBarWidth: width }))
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