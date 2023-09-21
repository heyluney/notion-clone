

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import Icon from '../../components/popups/Icon';
import { saveItem } from '../../utils/local_storage';

import { PageContext } from '../../App';

const TaskList = () => {
    const { pages, changePages } = useContext(PageContext);
    const [allPages, active] = pages;
    const [name, __, icon, ___] = allPages[active];

    const onDrop = (_, category) => {
        const newTodos = { ...todos };
        newTodos[draggedTask.category] =
            [...todos[draggedTask.category]
                .filter(todo => todo.taskId != draggedTask.taskId)];
        newTodos[category] = [...todos[category], draggedTask];
        updateDraggedTask({});
        updateTodos(newTodos);
    }

    const onDrag = (e, todo, category) => {
        e.preventDefault();
        const newTodo = { ...todo, ...{ "category": category } };
        updateDraggedTask(newTodo);
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

    const [isUpdatingTitle, updatingTitle] = useState(false);
    const [draggedTask, updateDraggedTask] = useState({});
    return (
        <div className={styles.tasklist}>
            <div className={styles.title}>
                <div className={styles.emoji}
                >
                    <Icon icon={icon}/>
                </div>
                <textarea
                    readOnly={!isUpdatingTitle}
                    defaultValue={name}
                    onClick={() => {
                        updatingTitle(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const newPageTitle = e.target.value;
                            const newPage = {
                                [e.target.value]:
                                    allPages[active]
                                    .map((x, idx) => idx == 0 ? newPageTitle : x)
                            };
                            const { [active]: value, ...allPagesWithOldRemoved } = allPages;
                            const newPages = [{ ...allPagesWithOldRemoved, ...newPage }, newPageTitle];
                            changePages(newPages);
                            saveItem('pages', newPages);
                            updatingTitle(false);
                        }
                    }}
                />
                {/* <div>{name}</div> */}
            </div>
            <div className={styles.description}>
                Use this template to track your personal tasks.
                Click + New to create a new task directly on this board.
                Click an existing task to add additional context or subtasks.
            </div>

            <div className={styles.list}>
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