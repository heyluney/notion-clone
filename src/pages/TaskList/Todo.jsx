import { useState, useContext, useRef } from 'react';

import Icon from '../../components/popups/Icon';
import styles from './Todo.module.css';

import { PageContext } from '../../App';

import EditButton from '../../components/buttons/EditButton';
import DeleteButton from '../../components/buttons/DeleteButton';

import { editTodo } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';

const Todo = ({todo, onDrag, itemBeingMousedOver}) => {

    const { pages, currentPageName, changePages, component, changeComponent } = useContext(PageContext);
    // This is so clicking on the emoji will only trigger opening the Emoji Selector, and not the slide out component.
    const todoRef = useRef();
    const iconRef = useRef();
    const buttonsRef = useRef();
    const textAreaRef = useRef();

    const [currentTodo, editCurrentTodo] = useState(todo);

    const [todoStyle, changeTodoStyle] = useState({
        background: "white"
    })
    return (
        <div
            ref={todoRef}
            key={todo.id}
            className={styles.todo}
            style={todoStyle}
            onClick={(e) => {
                if (iconRef.current && 
                    iconRef.current.contains(e.target)) 
                    {
                        return;
                    }
                if (buttonsRef.current && 
                    buttonsRef.current.contains(e.target)) 
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
                    })}}
                >
                    <Icon 
                        type="todo"
                        icon={todo.emoji}
                        value={`todo_${todo.id}`}
                    />
                </div>
                <textarea 
                    ref={textAreaRef}
                    className={styles.textarea} 
                    readOnly={component.id !== todo.id}   
                    defaultValue={todo.title}   
                    onKeyDown={(e) => {
                        editCurrentTodo(e.target.value);
                        if (e.key === 'Enter') {
                            const newPages = 
                                editTodo(pages, currentPageName, todo.id, currentTodo);
                            changePages(newPages);
                            saveItem('pages', newPages);
                            editCurrentTodo("");
                            changeComponent({
                                id: null,
                                type: null,
                                popups: {...component.popups}
                            })
                            changeTodoStyle({
                                background: "rgba(35,131,226,.28)",
                                transition: "1s"
                            })
                            setTimeout(() => {
                                changeTodoStyle({
                                    background: "white",
                                    transition: "1s"
                                })
                            }, 1000);
                        }
                    }}
                />
            </div>
            <div className={styles.buttons} ref={buttonsRef}>
                <EditButton type="tasklist" 
                    textAreaRef={textAreaRef}
                    idx={todo.id} 
                    itemBeingMousedOver={itemBeingMousedOver}/>
                <DeleteButton type="tasklist" 
                    idx={todo.id}
                    itemBeingMousedOver={itemBeingMousedOver}/>
            </div>
        </div>
    )
}

export default Todo;