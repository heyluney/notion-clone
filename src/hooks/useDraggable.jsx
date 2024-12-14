import { useState, useContext } from "react";
import { PageContext } from "../App";
import { moveComponent } from "../data/database/database_functions";

// Enables child components to be draggable. Exposes handlers for different drag behaviors.
const useDraggable = (parentId) => {
    const {components, changeComponents} = useContext(PageContext);

    const [draggableState, updateDraggableState] = useState({
        draggedPageId: -1,
        dropPageIdx: -1
    })

    const handleDragStart = (id) => {
        updateDraggableState({...draggableState, draggedPageId: id})
    }
    const handleDrag = (e) => e.preventDefault();
    const handleDragOver = (e, idx) => {
        e.preventDefault();
        updateDraggableState({...draggableState, dropPageIdx: idx})
    }
    const handleDrop = () => {
        const { draggedPageId, dropPageIdx } = draggableState;
        changeComponents(moveComponent(components, draggedPageId, parentId, dropPageIdx));
        updateDraggableState({
            droppedPageId: -1,
            dropPageIdx: -1
        })
    }
    const draggableHandlers = {
        handleDragStart,
        handleDrag,
        handleDragOver,
        handleDrop
    }

    return { draggableState, draggableHandlers };
}

export default useDraggable;