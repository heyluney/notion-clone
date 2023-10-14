import styles from './TodoCategory.module.css';

import Todo from './Todo';

const TodoCategory = ({ todos, category, onDrag, onDrop, updateClickedCategory }) => {
    // console.log('todos', Object.entries(todos));
    return (
        <div key={category}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category)}
        >
            <div className={styles.header}>
                <div className={styles.category_name}>
                    {category}
                </div>
                <div className={styles.date}>June 11</div>
            </div>
            {
                Object.entries(todos).map(([idx, todo]) =>
                    <Todo 
                        key={idx}
                        todo={todo} 
                        onDrag={onDrag}
                        updateClickedCategory={updateClickedCategory}/>)
            }
        </div>

    )
}
export default TodoCategory;