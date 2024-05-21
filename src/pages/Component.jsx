import { useContext } from "react";
import { PageContext } from "../App";

import TaskList from "./TaskList/TaskList"
import Journal from "./Journal/Journal"
import Comment from "../components/comments/Comment";

import styles from './Component.module.css'

import { component_map } from "../data/database/component_map";

// retrieve correct component to render 
const components = {
    [component_map["journal"]]: Journal,
    // [component_type['tasklist']]: TaskList,
    // [component_type['comment']]: Comment
};

const Component = ({component_id, component}) => {
    const { components } = useContext(PageContext);

    const Component = components[component.component_type];

    // const findSubComponents = (componentId) => {
    //     return Object.entries(subComponents)
    //         .filter(
    //             ([idx, subComponent]) => 
    //             subComponent.parent_id == componentId);
    // }

    return (
        <div className={styles.component}>
            <button>+</button>

            <Component 
            component={component} />        
        </div>
    )
    
}

export default Component;