import { useContext, useRef } from 'react';

import { PageContext } from '../../App';

import styles from './AddTodo.module.css';

import { useState } from 'react';


import { FaPlus as Plus } from 'react-icons/fa6';

import Icon from '../../components/popups/Icon';


const AddTodo = ({category}) => {
    // const { pages } = useContext(PageContext);

    const [isActive, toggleActive] = useState(false);

    const plusIcon = "2795";

    const iconRef = useRef();
    return (
        <div></div>
        // <div className={`${styles.add_todo} ${isActive ? styles.active : null}`} 
        //     onClick={(e) => {
        //         if (iconRef.current && 
        //             iconRef.current.contains(e.target)) return;
        //         toggleActive(!isActive);
        //     }
        // }>
        //     {isActive ?  
        //         <div ref={iconRef} onClick={() => {
        //             changeComponent({
        //                 id: component.id === null ? category : null,
        //                 type: component.type === null ? "add_todo": null,
        //                 popups: {
        //                     ...component.popups,
        //                     "emoji": !component.popups.emoji
        //                 }
        //             })
        //         }}>
        //             <Icon icon={plusIcon} value={`add_todo_${category}`} /> 
        //         </div>
        //         : 
        //         <Plus />}
        //     <input 
        //         placeholder="Add Todo"
        //         onKeyDown={(e) => {
        //         if (e.key === 'Enter') {
        //             const newPages = addTodo(pages, currentPageName, e.target.value, category);
        //             changePages(newPages);
        //             saveItem('pages', newPages);
        //         }
        //     }} />
        // </div>
    )
}

export default AddTodo;