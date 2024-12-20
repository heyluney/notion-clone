import styles from './Component.module.css'
import DynamicComponent from "../hooks/DynamicComponent";

// Abstract "Component" component. Will dynamically render component based on component's component_type attribute.
const Component = ({component}) => {
    return (
        <div className={styles.component}>
            <DynamicComponent 
                componentName={component.component_type} />        
        </div>
    )
    
}

export default Component;