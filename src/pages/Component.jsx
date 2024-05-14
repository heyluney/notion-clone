import { useContext } from "react";
import { PageContext } from "../App";

import TaskList from "./TaskList/TaskList"
import Journal from "./Journal/Journal"
import Comment from "../components/comments/Comment";

import styles from './Component.module.css'

import { componentType } from "../data/component_map";

const components = {
    [componentType["journal"]]: Journal,
    [componentType['tasklist']]: TaskList,
    [componentType['comment']]: Comment
};

const Component = ({component_id, component}) => {
    const { subComponents } = useContext(PageContext);

    const Component = components[component.component_type];

    const findSubComponents = (componentId) => {
        return Object.entries(subComponents)
            .filter(
                ([idx, subComponent]) => 
                subComponent.parent_id == componentId);
    }

    return (
        <div className={styles.component}>
            <button>+</button>

            <Component 
            component={component}
            subComponents={findSubComponents(component_id)} />
        
        </div>
    )
    
}

export default Component;