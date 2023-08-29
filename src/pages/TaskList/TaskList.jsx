

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import Icon from '../../components/popups/Icon';
import EmojiSelector from '../../components/popups/EmojiSelector';

import { PageContext } from '../../App';

const TaskList = () => {
    const {pages, changePages} = useContext(PageContext);
    const [allPages, active] = pages;
    const [name, _, icon, __] = allPages[active];

    const onDrop = (e, category) => {
        const draggedTaskCategory = draggedTask.category;
        todos[draggedTaskCategory] =
            [...todos[draggedTaskCategory].filter(todo => todo.taskId != draggedTask.taskId)];
        delete draggedTask["category"];
        todos[category] = [...todos[category], draggedTask];
        updateDraggedTask({});
        updateTodos(todos);
    }

    const onDrag = (e, todo, category) => {
        e.preventDefault();
        todo["category"] = category;
        updateDraggedTask(todo);
    }

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
        }, {
            taskId: 4,
            task: "go to Yosemite"
        }],
        "doing": [],
        "complete": [],
        "category4": [],
        "category5": [],
        "category6": [],
        "category7": [],
        "category8": [],
        "category9": []
    })

    const [draggedTask, updateDraggedTask] = useState({});
    const [displayEmoji, updateDisplayEmoji] = useState(false);
    return (
        <div className={styles.page}>
            <div className={styles.title}>
                <div 
                className={styles.emoji} 
                onClick={
                    () => updateDisplayEmoji(!displayEmoji)
                }
                >
                        {/* {String.fromCodePoint(icon)} */}
                        {<Icon icon={icon}/>}
                        </div>
                {displayEmoji ? <EmojiSelector /> : null}
                <div>{name}</div>
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
                        <div className={styles.header}><span className={styles.name}>{category}</span></div>
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