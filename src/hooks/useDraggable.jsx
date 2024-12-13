import { useState, useRef, useEffect } from "react";

// what information does this component need

// when components changes I need to trigger re-render
const useDraggable = () => {
 const [draggedPageId, changeDraggedPageId] = useState(-1);
 const [dropPageIdx, changeDropPageIdx] = useState(-1);

 return { draggedPageId, changeDraggedPageId, dropPageIdx, changeDropPageIdx };
}

export default useDraggable;