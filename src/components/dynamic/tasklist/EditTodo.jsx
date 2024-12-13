import styles from './EditTodo.module.css';

const EditTodo = ({idx, todo, changeDraggedTodoId, changeDropTodoIdx}) => {
    const { title } = todo.content;
    return (
        <div 
            className={styles.todo}
            draggable={true}
            onDrag={(e) => {
                e.preventDefault();
                changeDraggedTodoId(todo.id);
            }}
            onDragOver={(e) =>  {
                e.preventDefault()
                changeDropTodoIdx(idx)
            }}>
            {title}
        </div>
    )
}

export default EditTodo;