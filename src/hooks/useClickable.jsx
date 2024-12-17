import { useState, useEffect } from 'react';

// Stores the id of the component that was clicked.
const useClickable = (id) => {
  const [clickState, changeClickState] = useState(null);

  const handleClick = () => changeClickState(id);

  // Adds click event handler when the component mounts, and removes this event handler when the component unmounts.
  useEffect(() => {
    document.addEventListener('mousedown', () => handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return [clickState, changeClickState];
};

export default useClickable;