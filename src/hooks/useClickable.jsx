import { useState, useEffect } from 'react';

// Stores the id of the component that was clicked.
const useClickable = () => {
  const [clickState, changeClickState] = useState(null);

  return [clickState, changeClickState];
};

export default useClickable;