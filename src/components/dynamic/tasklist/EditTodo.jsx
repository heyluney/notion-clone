import { useState, useContext, useRef } from 'react';

import styles from './EditTodo.module.css';

// import EditButton from '../../components/buttons/EditButton';
// import Emoji from '../popups/Emoji';

const EditTodo = ({id, todo, onDrag, itemBeingMousedOver}) => {
    // const { emojis } = useContext(PageContext);

    // This is so clicking on the emoji will only trigger opening the Emoji Selector, and not the slide out component.
    // const todoRef = useRef();
    // const iconRef = useRef();
    // const buttonsRef = useRef();
    // const textAreaRef = useRef();

    // const [currentTodo, editCurrentTodo] = useState(todo);

    // const [todoStyle, changeTodoStyle] = useState({
    //     background: "white"
    // })
    return (
        <div></div>
        // <div
        //     ref={todoRef}
        //     className={styles.todo}
        //     style={todoStyle}

        //     draggable={true}
        //     onDrag={(e) => onDrag(e, id)}>

        //     <div className={styles.left}>
        //         <div 
        //             ref={iconRef} 
        //             onClick={() => {
                        
        //         }}
        //         >
        //         {/* <Emoji /> */}

        //         </div>
        //         <textarea 
        //             ref={textAreaRef}
        //             className={styles.textarea} 
        //             value={todo[1].title}   
        //             onChange={(e) => console.log('e', e.target.value)}
        //             onKeyDown={(e) => {
        //                 editCurrentTodo(e.target.value);
        //                 if (e.key === 'Enter') {
                 
        //                     editCurrentTodo("");
               
        //                     changeTodoStyle({
        //                         background: "rgba(35,131,226,.28)",
        //                         transition: "1s"
        //                     })
        //                     setTimeout(() => {
        //                         changeTodoStyle({
        //                             background: "white",
        //                             transition: "1s"
        //                         })
        //                     }, 1000);
        //                 }
        //             }}
        //         />
        //     </div>
        // </div>
    )
}

export default EditTodo;