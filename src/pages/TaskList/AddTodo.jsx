import { useContext } from 'react';

import { PageContext } from '../../App';

import styles from './AddTodo.module.css';

import { addTodo } from '../../data/pages_helper_functions';
import { saveItem } from '../../utils/local_storage';

const AddTodo = ({category}) => {
    const { pages, currentPageName, changePages } = useContext(PageContext);
    return (
        <div className={styles.add_todo}>
            <input 
                placeholder="Add Todo"
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const newPages = addTodo(pages, currentPageName, e.target.value, category);
                    changePages(newPages);
                    saveItem('pages', newPages);
                }
            }} />
        </div>
    )
}

export default AddTodo;