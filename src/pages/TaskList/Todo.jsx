import { useContext } from 'react';

import Icon from '../../components/popups/Icon';
import styles from './Todo.module.css';

import { SlideOutContext } from '../../App';
const Todo = ({todo, onDrag, updateClickedCategory}) => {
    const { toggleSlideOut, togglePhysicalSlideOut } = useContext(SlideOutContext);
    console.log('todo', todo)
    return (
        <div
            key={todo.id}
            onClick={() => {
                toggleSlideOut(todo.id);
                togglePhysicalSlideOut(true);
                updateClickedCategory(todo.category);
            }}
            className={styles.todo}
            draggable={true}
            onDrag={e => onDrag(e, todo)}>
            <Icon 
                icon={todo.emoji}
                component={`${"Todo"}_${todo.id}`}
            />
            {todo.title}
        </div>
    )
}

export default Todo;