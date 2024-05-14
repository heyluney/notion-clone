

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import { PageContext } from '../../App';

import TodoCategory from './TodoCategory';

import {sortTodosIntoCategories} from './todos_utility_functions';

import { todo_constant } from '../../data/constants/text_contents';

import Header from '../../components/title/Header';

const TaskList = ({components, subComponents}) => {
    const { changeComponents } = useContext(PageContext);

    
    const onDrop = (_, movedToCategory) => {
        changeComponents({...components, [draggedTodoIdx]: {
            ...components[draggedTodoIdx],
            category_id: movedToCategory
        }})
    }

    const onDrag = (e, idx) => {
        e.preventDefault();
        updateDraggedTodoIdx(idx);
    }

    // // Stores what todo is currently in the state of being dragged, and the category that it was dragged from.
    const [draggedTodoIdx, updateDraggedTodoIdx] = useState();
    
    return (
        <div>            
            {/* <div className={styles.description}>
                {todo_constant}
            </div> */}
        
            <div className={styles.list}>
                This is the tasklist
                {/* <TodoCategory category={category} todos={todos}*/}
                {/* {Object.entries(sortTodosIntoCategories(tasklists, categories)).map(
                    ([category_id, tasklists]) => 
                        <TodoCategory 
                            key={category_id}
                            todos={tasklists} 
                            category_id={category_id}
                            onDrag={onDrag}
                            onDrop={onDrop} 
                            draggedTodoIdx={draggedTodoIdx}
                            />
                
                )} */}
            </div>
        </div>
    )
}

export default TaskList;