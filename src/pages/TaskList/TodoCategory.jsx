import { useState, useRef } from 'react';

import styles from './TodoCategory.module.css';

import EditTodo from './EditTodo';
import AddTodo
 from './AddTodo';

import { getFullTimeString } from '../../utils/calculate_date';

const TodoCategory = ({ todos, category, onDrag, onDrop, timestamp, color }) => {

    const [itemBeingMousedOver, changeMouseOver] = useState(-1);

    const [categoryActive, toggleCategoryActive] = useState(false);

    const textAreaRef = useRef();
    return (
        <div key={category}
            className={styles.category}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, category)}
        >
            <div className={styles.header}>
                <div className={categoryActive === category ?  styles.active_category_name : styles.category_name}
                    style={categoryActive === category ? {
                        background: color,
                        filter:"brightness(0.8)"
                    } : {
                        background: color
                    }}
                    onClick={() => {
                        toggleCategoryActive(categoryActive === null ? category : null)
                        textAreaRef.current.setSelectionRange(
                            textAreaRef.current.value.length, textAreaRef.current.value.length
                        )
                    }}
                >
                    <textarea
                        ref={textAreaRef}
                        className={styles.textarea} 
                        style={{background: "transparent"}} 
                        defaultValue={category}
                        onKeyDown={(e) => {

                        }}/>
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