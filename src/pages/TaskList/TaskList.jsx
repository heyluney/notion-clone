

import { useState } from 'react';
import styles from './TaskList.module.css';

const TaskList = () => {
    const [todos, updateTodos] = useState({
        "undone": [{
            taskId: 1,
            task: "buy milk"
        }, {
            taskId: 2,
            task: "take Clark out"
        }, {
            taskId: 3,
            task: "go climbing"
        }],
        "doing": [],
        "complete": []
    })

    const [draggedTask, updateDraggedTask] = useState({});

    const onDrop = (e, category) => {
        const draggedTaskCategory = draggedTask.category;
        todos[draggedTaskCategory] =
            [...todos[draggedTaskCategory].filter(todo => todo.taskId != draggedTask.taskId)];
        delete draggedTask["category"];
        todos[category] = [...todos[category], draggedTask];
        updateDraggedTask({});
        console.log('todos', todos);
        updateTodos(todos);
    }

    const onDrag = (e, todo, category) => {
        e.preventDefault();
        todo["category"] = category;
        updateDraggedTask(todo);
    }

    return (
        <div className={styles.tasklistpage}>
            <div className={styles.title}>
                Task List
            </div>
            <div className={styles.description}>
                Use this template to track your personal tasks.
                Click + New to create a new task directly on this board.
                Click an existing task to add additional context or subtasks.
            </div>

            <div className={styles.tasklist}>
                {Object.entries(todos).map(([category, todos]) => (
                    <div key={category}
                        className={styles.category}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => onDrop(e, category)}
                    >
                        {
                            todos.map(todo =>
                            <div
                                key={todo.taskId}
                                className={styles.todo}
                                draggable={true}
                                onDrag={e => onDrag(e, todo, category)}>
                                {todo.task}
                            </div>)
                        }
                    </div>
                ))}
            </div>

        </div>
    )
}

export default TaskList;



{/* <div className={styles.todos1}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => onDrop(e, "undone")}>
                    {todos["undone"].map(todo =>
                        <div key={todo.taskId}
                            draggable
                            onDrag={e => onDrag(e, todo, "undone")}>
                            {todo.task}
                        </div>)}</div>
                <div className={styles.todos2}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => onDrop(e, "doing")}>
                    {todos["doing"].map(todo =>
                        <div key={todo.taskId}
                            draggable
                            onDrag={e => onDrag(e, todo, "doing")}>
                            {todo.task}
                        </div>)}
                </div>
                <div className={styles.todos3}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => onDrop(e, "complete")}>
                    {todos["complete"].map(todo =>
                        <div key={todo.taskId}
                            draggable
                            onDrag={e => onDrag(e, todo, "complete")}>
                            {todo.task}
                        </div>)}
                </div> */}