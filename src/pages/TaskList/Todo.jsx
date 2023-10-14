import { useContext } from 'react';

import { computeEmoji } from '../../data/compute_emojis';

import Icon from '../../components/popups/Icon';
import styles from './Todo.module.css';

import { SlideOutContext } from '../../App';
const Todo = ({todo, onDrag}) => {
    const { toggleSlideOut, togglePhysicalSlideOut } = useContext(SlideOutContext);

    return (
        <div
            key={todo.id}
            onClick={() => {
                toggleSlideOut(todo.id);
                togglePhysicalSlideOut(true);
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