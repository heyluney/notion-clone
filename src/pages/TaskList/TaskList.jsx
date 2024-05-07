

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import Title from '../../components/title/Title';

import { PageContext } from '../../App';

import { moveTodo } from '../../data/pages_helper_functions';

import SlideOut from '../../components/popups/SlideOut';
import TodoCategory from './TodoCategory';

import {sortTodosIntoCategories} from './todos_utility_functions';

import Emoji from '../../components/popups/Emoji';
import { todo_constant } from '../../data/text_contents';

import Header from '../../components/title/Header';

const TaskList = ({emoji}) => {
    const { todos, changeTodos, categories } =  useContext(PageContext);

    const onDrop = (_, movedToCategory) => {
        changeTodos({...todos, [draggedTodoIdx]: {
            ...todos[draggedTodoIdx],
            category_id: movedToCategory
        }})
    }

    const onDrag = (e, idx) => {
        e.preventDefault();
        updateDraggedTodoIdx(idx);
    }

    // Stores what todo is currently in the state of being dragged, and the category that it was dragged from.
    const [draggedTodoIdx, updateDraggedTodoIdx] = useState();


    return (
        <div>
            <Header />
            <div className={styles.description}>
                {todo_constant}
            </div>
        
            <div className={styles.list}>
                {Object.entries(sortTodosIntoCategories(todos, categories)).map(
                    ([category_id, todos]) => 
                        <TodoCategory 
                            key={category_id}
                            todos={todos} 
                            category_id={category_id}
                            onDrag={onDrag}
                            onDrop={onDrop} 
                            draggedTodoIdx={draggedTodoIdx}
                            />
                
                )}
            </div>

            {/* <SlideOut /> */}
        </div>
    )
}

export default TaskList;