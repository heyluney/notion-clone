import { useState, useRef, useContext } from 'react';

import { PageContext } from '../../App';

import styles from './TodoCategory.module.css';

import EditTodo from './EditTodo';
import AddTodo
 from './AddTodo';

import { getFullTimeString } from '../../utils/calculate_date';

const TodoCategory = ({ categories, category, onDrag, onDrop, todos }) => {
    // const { todos } = useContext(PageContext);

    const [itemBeingMousedOver, changeMouseOver] = useState(-1);

    const [categoryActive, toggleCategoryActive] = useState(false);

    const textAreaRef = useRef();
    console.log("todo category", Object.entries(todos))
    return (
        <div key={category}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category)}
        >
            <div className={styles.header}>
                <div className={categoryActive === category ?  styles.active_category_name : styles.category_name}
                    onClick={() => {
                        toggleCategoryActive(categoryActive === 
                            null ? category : null)
                        textAreaRef.current.setSelectionRange(
                            textAreaRef.current.value.length, textAreaRef.current.value.length
                        )
                    }}
                >
                    <textarea
                        ref={textAreaRef}
                        className={styles.textarea} 
                        style={{background: "transparent"}} 
                        value={category}
                        onChange={() => {}}
                        />
                </div>
                {/* <div className={styles.date}>{getFullTimeString(timestamp)}</div> */}
            </div>
            {
                Object.entries(todos).map(([id, todo]) =>
                <div key={id}
                    onMouseEnter={() => changeMouseOver(parseInt(id))}
                    onMouseLeave={() => changeMouseOver(-1)}>
                    <EditTodo 
                        id={id}
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