import { useState, useEffect } from "react";

const useHover = (ref) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    useEffect(() => {
        ref.current.addEventListener("mouseover", handleMouseOver)
        ref.current.addEventListener("mouseout", handleMouseOut)

        return () => {
            ref.current.removeEventListener("mouseover", handleMouseOver);
            ref.current.removeEventListener("mouseout", handleMouseOut);
        }
    }, [])
   
    return hovered
}

export default useHover;