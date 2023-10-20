import { useContext, useRef } from 'react';

import Icon from '../../components/popups/Icon';
import styles from './Todo.module.css';

import { PageContext } from '../../App';

import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';

const Todo = ({todo, onDrag}) => {

    const { component, changeComponent } = useContext(PageContext);
    // This is so clicking on the emoji will only trigger opening the Emoji Selector, and not the slide out component.
    const iconRef = useRef();

    return (
        <div
            key={todo.id}
            onClick={(e) => {
                if (iconRef && 
                    iconRef.current && 
                    iconRef.current.contains(e.target)) 
                    {
                        return;
                    }
                
                changeComponent({
                    id: todo.id,
                    type: "tasklist",
                    popups: {
                        ...component.popups,
                        slideout: !component.popups.slideout
                    }
                })     
            }}
            className={styles.todo}
            draggable={true}
            onDrag={e => onDrag(e, todo)}>

            <div className={styles.left}>
                <div 
                    ref={iconRef} 
                    onClick={() => {
                    changeComponent({
                        id: component.id === null ? todo.id : null,
                        type: component.type === null ? "tasklist" : null,
                        popups: {
                            ...component.popups,
                            emoji: !component.popups.emoji
                        }
                    })
                }}>
                    <Icon 
                        type="todo"
                        icon={todo.emoji}
                        value={`todo_${todo.id}`}
                    />
                </div>
                <div>{todo.title}</div>
            </div>
            <div className={styles.buttons}>
                <EditButton />
                <DeleteButton />
            </div>
        </div>
    )
}

export default Todo;