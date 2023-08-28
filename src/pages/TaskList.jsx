

import { useRef } from 'react';

const TaskList = () => { 
    const elemRef = useRef(null);
    const dragProps = useRef();

    const initializeDrag = event => {
        const { target, clientX, clientY } = event;
        const { offsetTop, offsetLeft } = target;
        const { left, top } = elemRef.current.getBoundingClientRect();

        dragProps.current = {
            dragStartLeft: left - offsetLeft,
            dragStartTop: top - offsetTop,
            dragStartX: clientX,
            dragStartY: clientY
          }

        window.addEventListener('mousemove', startDragging);
        window.addEventListener('mouseup', stopDragging);
    }

    const startDragging = ({ clientX, clientY }) => {    
        console.log("startDragging", clientX, clientY);

        elemRef.current.style.transform = 
            `translate(${dragProps.current.dragStartLeft + clientX - dragProps.current.dragStartX}px, 
                ${dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY}px)`
      } 
    
    const stopDragging = ({clientX, clientY}) => {
        console.log("stopDragging", clientX, clientY);
        window.removeEventListener('mousemove', startDragging);
        window.removeEventListener('mouseup', stopDragging);
    }

    return (
        <div onMouseDown={initializeDrag}
            ref={elemRef}>
            This is draggable
        </div>
    )
}

export default TaskList;
