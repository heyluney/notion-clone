import { useState } from 'react';

import styles from './TodoCategory.module.css';

import Todo from './Todo';
import AddTodo
 from './AddTodo';

import { getFullTimeString } from '../../utils/calculate_date';

const TodoCategory = ({ todos, category, onDrag, onDrop, timestamp, color }) => {

    const [itemBeingMousedOver, changeMouseOver] = useState(-1);

    return (
        <div key={category}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category)}
        >
            <div className={styles.header}>
                <div className={styles.category_name}
                    style={{
                        background: color
                    }}
                >
                    {category}
                </div>
                <div className={styles.date}>{getFullTimeString(timestamp)}</div>
            </div>
            {
                Object.entries(todos).map(([idx, todo]) =>
                <div key={idx}
                    onMouseEnter={() => changeMouseOver(parseInt(idx))}
                    onMouseLeave={() => changeMouseOver(-1)}>
                    <Todo 
                        key={idx}
                        todo={todo} 
                        onDrag={onDrag} 
                        itemBeingMousedOver={itemBeingMousedOver}
                        />
                </div>)
            }
            <AddTodo category={category} />
        </div>

    )
}
export default TodoCategory;