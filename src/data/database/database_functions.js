import { component_map, default_content_map } from "./component_map";

// Helper functions to update a component's children array. Component (not components) level.
const addChildComponent = (components, id, child_id, order_id) => {
    if (order_id == -1) order_id = components[id].children.length;
    return {
        ...components,
        [id]: {
            ...components[id],
            children: [
                ...components[id].children.slice(0, order_id), 
                child_id,
                ...components[id].children.slice(order_id)]
        }
    }
}

const removeChildComponent = (components, id, child_id) => {
    const index = components[id].children.indexOf(child_id);
    return {
        ...components,
        [id]: {
            ...components[id],
            children: [
                ...components[id].children.slice(0, index),
                ...components[id].children.slice(index+1)
            ]
        }
    }
}

// Creates a component and updates the components state to reflect the newly added component.
export const createComponent = (
    components,
    component_type,
    parent_id,
    content = default_content_map[component_type],
    order_id = -1
) => {
    const id = calculateNextKey(components);

    components = addChildComponent(components, parent_id, id, order_id);


    return { 
        ...components,
        [id]: {
            id: id,
            parent_id: parent_id,
            children: [],
            component_type: component_type,
            content: content
        }
    };
}


export const deleteComponent = (components, component_id) => {
    let newComponents = {};

    // Recursively delete all child components, from bottom up.
    const child_ids = components[component_id].children;
    for (let child_id of child_ids) {
        newComponents = deleteComponent(components, child_id);
    }
    
    // All children and associated parent references deleted at this point, so it is safe to delete component_id (no orphans).
    const { [component_id]: component, ...rest } = newComponents;

    // Must remove reference in component's parent.
    const updatedParent = removeChildComponent(
        components[components[component_id].parent_id],
        component_id);

    return {...rest, updatedParent};
}
// is this function
export const moveComponent = (components, component_id, new_parent_id, new_order_id) => {
    components = removeChildComponent(components, components[component_id].parent_id, component_id);
    components = addChildComponent(components, new_parent_id, component_id, new_order_id);
    return components;
}


export const duplicateComponent = (
    components, 
    /*component_to_duplicate=*/component_id, 
    /*parent_component, which has already been duplicated except at base*/duplicated_parent_component_id=components[component_id].parent_id) => 
{
    // Retrieves the content of the component to be duplicated, with id, parent_id and the children array to be set. 
    const {id, parent_id, children, component_type, ...content} = components[component_id];

    let updatedComponents = createComponent(
        components, 
        component_type, 
        duplicated_parent_component_id, 
        {...content});
      
    const duplicated_component_id = retrieveLatestKey(updatedComponents);

    // Duplicates each child component of the duplicated component.
    for (let child_id of components[component_id].children) {
        updatedComponents = duplicateComponent(updatedComponents, child_id, duplicated_component_id);
    }

    return updatedComponents;
}

export const updateComponent = (components, component_id, content) => {
    const updatedComponent = {
        ...components[component_id],
        ...content
    }

    return { ...components, [component_id]: updatedComponent };
}
// Retrieve the latest key.
export const retrieveLatestKey = hash => {
    const descKeys = Object.keys(hash).map(x => parseInt(x)).sort((a, b) => b - a);
    return descKeys[0];
}

// Retrieve the earliest key.
export const retrieveEarliestKey = hash => {
    const ascKeys = Object.keys(hash).map(x => parseInt(x)).sort((a, b) => a-b);
    return ascKeys[0];
}

// Calculate the next available key.
export const calculateNextKey = hash => {
    const descKeys = Object.keys(hash).map(x => parseInt(x)).sort((a, b) => b - a);
    return descKeys.length === 0 ? 0 : descKeys[0] + 1;
}

// This should be moved into defaultComponent map
export const createDefaultTaskList = (components, parent_id) => {
    components = createComponent(components, component_map['tasklist'], parent_id);

    const tasklist_id = retrieveLatestKey(components);
    components = 
        createComponent(components, 
                component_map['category'], 
                tasklist_id, 
                {title: "Not Started"});

    const not_started_id = retrieveLatestKey(components);

    components = createComponent(components, component_map['task'], not_started_id);
    components = createComponent(components, component_map['task'], not_started_id);
    components = createComponent(components, component_map['task'], not_started_id);

    components = createComponent(components, component_map['category'], tasklist_id, {title: "In Progress"});
    components = createComponent(components, component_map['category'], tasklist_id, {title: "Completed"});


    return components;
}