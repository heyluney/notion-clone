import { useContext } from 'react';

import { PageContext } from '../../../App';

import styles from './TodoCategory.module.css';

import EditTodo from './EditTodo';


const TodoCategory = ({ category, onDrop, changeDraggedTodoId, changeDropTodoIdx}) => {
    const { components, changeComponents } = useContext(PageContext);
    const { title } = category.content;
    return (
        <div key={category}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category.id)}
        >
            <div className={styles.header}>
                {title}
            </div>
            {
                category.children.map((todo_idx, idx) =>
                    <EditTodo 
                        key={idx}
                        idx={idx}
                        todo={components[todo_idx]} 
                        // onDrag={onDrag} 
                        onDrop={onDrop}
                        changeDraggedTodoId={changeDraggedTodoId}
                        changeDropTodoIdx={changeDropTodoIdx}
                        />)
            }
        </div>

    )
}
export default TodoCategory;