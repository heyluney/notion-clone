import { component_map, default_content_map } from "./component_map";

// Returns a copy of the parent component, with child_id added at index=order_id. The default behavior is to add the child component at the end.
const insertChildIdInParentOrder = (components, parent_id, child_id, order_id) => {
    const parentComponent = components[parent_id];
    if (parentComponent === undefined) return {};
    
    // Need to update child component's parent_id to point to the new parent_id.
    const childComponent = components[child_id];
    return {
        ...components,
        [child_id]: {
            ...childComponent,
            parent_id: parent_id
        },
        [parentComponent.id]: 
            { ...parentComponent, 
                children: [...parentComponent.children.slice(0, order_id), child_id, ...parentComponent.children.slice(order_id)] 
            }
    };
}

// Returns a copy of the parent component, with child_id removed.
const removeChildFromParentOrder = (components, parent_id, child_id) => {
    const parentComponent = components[parent_id];

    const idx_to_be_removed = components[parent_id].children.indexOf(child_id);
  
    const updated = {
        ...components,
        [parentComponent.id]: {
            ...parentComponent,
            children: [
                ...parentComponent.children.slice(0, idx_to_be_removed),
                ...parentComponent.children.slice(idx_to_be_removed + 1)]
        }
    }
    console.log('updated parent component', components[parentComponent.id])
    return updated;
}

// Recursively finds every child_id that is associated with component_id.
const findIdsToBeDeleted = (components, component_id) => {
    const ids_to_be_deleted = [component_id];
    for (let child_id of components[component_id].children) {
        const child_ids_to_be_deleted = findIdsToBeDeleted(components, child_id);
        for (let id of child_ids_to_be_deleted) {
            ids_to_be_deleted.push(id);
        }
    }
    return ids_to_be_deleted;
}

// Creates a component and returns it. As a side effect, updates the parent component to include the newly assigned unique id in it's children. By default, adds the component at the end of it's parent's children.
export const createComponent = (
    components,
    component_type,
    parent_id,
    content = default_content_map[component_type],
    order_id = components[parent_id].children.length 
) => {
    const id = calculateNextKey(components);

    const newComponent = {
        [id]: {
            id,
            component_type,
            parent_id,
            children: [],
            ...content,
        }
    }

    const componentsAfterUpdatingParentComponent =
        insertChildIdInParentOrder(components, parent_id, id, order_id);

    return { ...componentsAfterUpdatingParentComponent, ...newComponent };
}

// Removes a component and all of it's children components.
export const deleteComponent = (components, component_id) => {
    const ids_to_be_deleted = findIdsToBeDeleted(components, component_id);

    // we have to remember to remove it from the parent 
    const updatedParentComponent = removeChildFromParentOrder(
        components[components[component_id].parent_id],
        component_id);

    const newComponents = Object
        .entries(components)
        .reduce((a, [k, v]) =>
            (ids_to_be_deleted.indexOf(parseInt(k)) === -1 ? { ...a, [k]: v } : a), {})
    return { ...newComponents, ...updatedParentComponent };
}

export const moveComponent = (components, component_id, new_parent_id, new_order_id) => {
    const removalFromOldParentComponents = removeChildFromParentOrder(components, components[component_id].parent_id, component_id);

    const additionToNewParentComponents = insertChildIdInParentOrder(removalFromOldParentComponents, new_parent_id, component_id, new_order_id);

    return { ...components, ...additionToNewParentComponents };
}


export const duplicateComponent = (
    components, 
    component_id, 
    duplicated_parent_component_id=components[component_id].parent_id) => 
{

    // Retrieves the content of the component to be duplicated, with id, parent_id and the children array to be set. 
    const {id, parent_id, children, component_type, ...content_to_be_duplicated} = components[component_id];

    let updatedComponents = createComponent(
        components, 
        component_type, 
        duplicated_parent_component_id, 
        {...content_to_be_duplicated});
      
    const duplicated_component_id = retrieveLatestKey(updatedComponents);

    // Duplicates each child component of the duplicated component.
    for (let child_id of components[component_id].children) {
        updatedComponents = duplicateComponent(updatedComponents, child_id, duplicated_component_id);
    }

    return updatedComponents;
}


export const getComponentAttribute = (components, component_id, attribute) => {
    if (components[component_id][attribute] === undefined) 
        return default_content_map[attribute];

    return components[component_id][attribute];
}

export const updateComponent = (components, component_id, content) => {
    const updatedComponent = {
        ...components[component_id],
        ...content
    }
    return { ...components, ...updatedComponent };
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

// These methods retrieve and save to local storage.
export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}