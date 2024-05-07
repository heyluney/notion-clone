import { useState, useRef, useContext } from 'react';

import { PageContext } from '../../App';

import styles from './TodoCategory.module.css';

import EditTodo from './EditTodo';
import AddTodo
 from './AddTodo';

import { getFullTimeString } from '../../utils/calculate_date';

const TodoCategory = ({ todos, 
        category_id, 
        onDrag, 
        onDrop, 
        timestamp, color }) => {

    const { categories } = useContext(PageContext);

    const [itemBeingMousedOver, changeMouseOver] = useState(-1);

    const [categoryActive, toggleCategoryActive] = useState(false);

    const textAreaRef = useRef();
    return (
        <div key={category_id}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category_id)}
        >
            <div className={styles.header}>
                <div className={categoryActive === category_id ?  styles.active_category_name : styles.category_name}
                    style={categoryActive === category_id ? {
                        background: color,
                        filter:"brightness(0.8)"
                    } : {
                        background: color
                    }}
                    onClick={() => {
                        toggleCategoryActive(categoryActive === null ? category_id : null)
                        textAreaRef.current.setSelectionRange(
                            textAreaRef.current.value.length, textAreaRef.current.value.length
                        )
                    }}
                >
                    <textarea
                        ref={textAreaRef}
                        className={styles.textarea} 
                        style={{background: "transparent"}} 
                        value={categories[category_id]}
                        onChange={() => {}}
                        />
                </div>
                <div className={styles.date}>{getFullTimeString(timestamp)}</div>
            </div>
            {
                Object.entries(todos).map(([idx, todo]) =>
                <div key={idx}
                    onMouseEnter={() => changeMouseOver(parseInt(idx))}
                    onMouseLeave={() => changeMouseOver(-1)}>
                    <EditTodo 
                        key={idx}
                        idx={idx}
                        todo={todo} 
                        onDrag={onDrag} 
                        itemBeingMousedOver={itemBeingMousedOver}
                        />
                </div>)
            }
            {/* <AddTodo category_id={category_id} /> */}
        </div>

    )
}
export default TodoCategory;