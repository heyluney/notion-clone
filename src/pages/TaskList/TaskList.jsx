

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import { PageContext } from '../../App';

import TodoCategory from './TodoCategory';

import {sortTodosIntoCategories} from './todos_utility_functions';

import { todo_constant } from '../../data/constants/text_contents';


const TaskList = ({component}) => {
    const { tags, changeComponents } = useContext(PageContext);

    const categories = {};

    // for (let subComponent of subComponents) {
    //     const id = subComponent[0];
    //     for (let tag of Object.values(tags)) {
    //         if (tag.parent_id == id) {
    //             if (categories[tag.text] === undefined) categories[tag.text] = [];
    //             categories[tag.text].push(subComponent);
    //         }
    //     }
    // }

    // onDrop we are going to change the parent_id the tag is associated to 
    const onDrop = (_, movedToCategory) => {
        console.log('movedToCategory', movedToCategory);
        console.log(draggedTodoIdx);
        // changeComponents({...component, [draggedTodoIdx]: {
        //     ...component[draggedTodoIdx],
        //     category_id: movedToCategory
        // }})
    }

    const onDrag = (e, idx) => {
        e.preventDefault();
        updateDraggedTodoIdx(idx);
    }

    // // Stores what todo is currently in the state of being dragged, and the category that it was dragged from.
    const [draggedTodoIdx, updateDraggedTodoIdx] = useState();

    return (
        <div>            
            <div className={styles.description}>
                Todo
            </div>
        
            <div className={styles.list}>
                This is the tasklist

                {Object.entries(categories).map(
                    ([category, todos]) => 
                        <TodoCategory 
                            key={category}
                            todos={todos} 
                            categories={categories}
                            category={category}
                            onDrag={onDrag}
                            onDrop={onDrop} 
                            draggedTodoIdx={draggedTodoIdx}
                            />
                
                )}
            </div>
        </div>
    )
}

export default TaskList;