

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import Title from '../../components/title/Title';

import { PageContext } from '../../App';

import { moveTodo } from '../../data/pages_helper_functions';

import SlideOut from '../../components/popups/SlideOut';
import TodoCategory from './TodoCategory';

import normalizeTodos from './normalize_todos';
import { saveItem } from '../../utils/local_storage';

const TaskList = () => {
    const { pages, currentPageName, changePages } = 
        useContext(PageContext);

    const todos = pages[currentPageName].todos;

    const onDrop = (_, movedToCategory) => {
        const newPages = 
            moveTodo(pages, currentPageName, 
                draggedTodo.id, movedToCategory);
        changePages(newPages);
        saveItem('pages', newPages);
    }

    const onDrag = (e, todo) => {
        e.preventDefault();
        updateDraggedTodo(todo);
    }

    // Stores what todo is currently in the state of being dragged, and the category that it was dragged from.
    const [draggedTodo, updateDraggedTodo] = useState({});
    const [clickedCategory, updateClickedCategory] = useState("");
    return (
        <div className={styles.tasklist}>
            <div className={styles.header}>
             <Title horizontal={true}/>
            <div className={styles.description}>
                Use this template to track your personal tasks.
                Click + New to create a new task directly on this board.
                Click an existing task to add additional context or subtasks.
            </div>
            </div>

            <div className={styles.list}>
                {Object.entries(normalizeTodos(todos)).map(
                    ([category, todos]) => 
                        <TodoCategory 
                            key={category}
                            todos={todos} 
                            category={category}
                            onDrag={onDrag}
                            onDrop={onDrop} 
                            draggedTodo={draggedTodo} 
                            updateClickedCategory={updateClickedCategory} />
                
                )}
            </div>

            <SlideOut type="tasklist" category={clickedCategory}/>
        </div>
    )
}

export default TaskList;