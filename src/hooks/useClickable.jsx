import { useState, useEffect, useContext } from 'react';

import { PageContext } from '../App';

// Stores information about when a ref was clicked and when a click was detected outside a ref. Returns this information in the form of a boolean (clickState), so the component can decide on what to do if that ref is clicked/click is detected outside the ref.
const useClickable = (ref, enableBackgroundFreeze=true) => {
  const {changeOverlay} = useContext(PageContext);
  const [clickState, changeClickState] = useState(false);

  const handleClick = e => {
    if (!ref.current) return;
    // Detects whether the click was inside the ref, or outside the ref and toggles click state accordingly.
    changeClickState(ref.current.contains(e.target) ? true : false)
  };

  // By default, freezes the background when a button is clicked. This is useful for popups, where we want the background to not be clickable.
  useEffect(() => { 
    if (!enableBackgroundFreeze) return;
    changeOverlay(clickState ? true : false) 
  }, [clickState]);

  // Adds click event handler when the component mounts, and removes this event handler when the component unmounts.
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return [clickState, changeClickState];
};

export default useClickable;