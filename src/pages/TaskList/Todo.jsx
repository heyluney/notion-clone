import { useContext, useRef } from 'react';

import Icon from '../../components/popups/Icon';
import styles from './Todo.module.css';

import { PopupContext } from '../../App';

import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';

const Todo = ({todo, onDrag, updateClickedCategory}) => {
    const { slideOut, toggleSlideOut, togglePhysicalSlideOut, slideOutTransitionTime } = useContext(PopupContext);

    // This is so clicking on the emoji will only trigger opening the Emoji Selector, and not the slide out component.
    const iconRef = useRef();

    return (
        <div
            key={todo.id}
            onClick={(e) => {
                if (iconRef && 
                    iconRef.current && 
                    iconRef.current.contains(e.target)) return;
                
                if (slideOut === null) {
                    toggleSlideOut(todo.id);
                    togglePhysicalSlideOut(true);
                    updateClickedCategory(todo.category);
                } else {
                    setTimeout(() => toggleSlideOut(null),
                    slideOutTransitionTime);
                    togglePhysicalSlideOut(false);

                    if (todo.id !== slideOut) {
                        setTimeout(() => toggleSlideOut(todo.id), slideOutTransitionTime*2);
                        setTimeout(() => togglePhysicalSlideOut(true), slideOutTransitionTime*2);
                        setTimeout(() => updateClickedCategory(todo.category),
                        slideOutTransitionTime);
                    }
                   
                }
             
            }}
            className={styles.todo}
            draggable={true}
            onDrag={e => onDrag(e, todo)}>

            <div className={styles.left}>
                <div ref={iconRef}>
                    <Icon 
                        type="todo"
                        icon={todo.emoji}
                        component={`${"Todo"}_${todo.id}`}
                    />
                </div>
                <div>{todo.title}</div>
            </div>
            <div className={styles.buttons} onMouseEnter={() => {

            }}>
                <EditButton />
                <DeleteButton />
            </div>
        </div>
    )
}

export default Todo;