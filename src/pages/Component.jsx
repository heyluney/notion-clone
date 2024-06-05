import { useContext } from "react";
import { PageContext } from "../App";

import TaskList from "./TaskList/TaskList"
import Journal from "./Journal/Journal"
import Comment from "../components/comments/Comment";

import styles from './Component.module.css'

import { component_map } from "../data/database/component_map";

// 
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