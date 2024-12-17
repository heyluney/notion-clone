import TaskList from "./dynamic/tasklist/TaskList"
import Journal from "./dynamic/journal/Journal";
import Comment from "./dynamic/comments/Comment";

import styles from './Component.module.css'

// Abstract "Component" component.
const Component = ({component}) => {
    // Maps component_type (a string) to a React component in order to render the correct React component dynamically.
    const map = {
        "journal": Journal,
        "tasklist": TaskList,
        "comment": Comment
    };

    const Component = map[component.component_type];

    return (
        <div className={styles.component}>
            <Component component={component} />        
        </div>
    )
    
}

export default Component;