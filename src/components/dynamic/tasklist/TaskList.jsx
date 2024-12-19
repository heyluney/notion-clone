

import { useState, useContext } from 'react';
import styles from './TaskList.module.css';

import { moveComponent } from '../../../data/database/database_functions';

import { PageContext } from '../../../App';

import TodoCategory from './TodoCategory';

const TaskList = ({ component }) => {
    // const { components, changeComponents } = useContext(PageContext);
    // const { title } = component.content;

    // const onDrop = (_, movedToCategoryId) => {
    //     const updatedComponents =
    //         moveComponent(
    //             components, draggedTodoId, movedToCategoryId, dropTodoIdx
    //         );
    //     changeComponents(updatedComponents);
    // }

    // const [dropTodoIdx, changeDropTodoIdx] = useState(-1);
    // const [draggedTodoId, changeDraggedTodoId] = useState(-1);

    return (
        <div>Task list is currently rendering!</div>
        // <div>
        //     <div className={styles.description}>
        //         {title}
        //     </div>

        //     <div className={styles.list}>
        //         {component.children.map(category_id =>
        //             <TodoCategory
        //                 key={category_id}
        //                 category={components[category_id]}
        //                 onDrop={onDrop}
        //                 changeDraggedTodoId={changeDraggedTodoId}
        //                 changeDropTodoIdx={changeDropTodoIdx}
        //             />
        //         )}
        //     </div>
        // </div>
    )
}

export default TaskList;