import TaskList from "./dynamic/tasklist/TaskList"
import Journal from "./dynamic/journal/Journal";
import Comment from "./dynamic/comments/Comment";

import styles from './Component.module.css'

import { component_map } from "../data/database/component_map";

const component_type_to_component_map = {
    [component_map["journal"]]: Journal,
    [component_map['tasklist']]: TaskList,
    [component_map['comment']]: Comment
};

const Component = ({component}) => {
    const Component = component_type_to_component_map[component.component_type];

    return (
        <div className={styles.component}>
            <button>+</button>

            <Component component={component} />        
        </div>
    )
    
}

export default Component;