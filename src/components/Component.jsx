import TaskList from "./dynamic/tasklist/TaskList"
import Journal from "./dynamic/journal/Journal";
import Comment from "./dynamic/comments/Comment";

import styles from './Component.module.css'

import { component_map } from "../data/database/component_map";



const Component = ({component}) => {
    // Maps component_type (a string) to a React component in order to render the correct React component dynamically.
    const map = {
        [component_map["journal"]]: Journal,
        [component_map['tasklist']]: TaskList,
        [component_map['comment']]: Comment
    };

    const Component = map[component.component_type];

    return (
        <div className={styles.component}>
            <Component component={component} />        
        </div>
    )
    
}

export default Component;