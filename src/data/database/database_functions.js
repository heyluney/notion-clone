import { component_map } from "./component_map";

// Retrieves a random component in the pre-seeded library.
export const getRandomComponent = (component_library, component_type) => {
    const components = component_library[component_type];
    return components[Math.floor(Math.random() * components.length)];
}

// Retrieves immediate child components for all types.
export const getAllChildComponents =
    (components, component_id) => {
        const child_components = [];
        for (let id in components) {
            const component = components[id];
            if (component.parent_id == component_id) {
                child_components.push(component);
            }
        }
        return child_components;
    }

export const getEmoji = (components, component_id) => 
    getChildComponent(components, component_id, "emoji");

// Retrieves immediate child components of specified component type.
export const getChildComponent =
    (components, component_id, component_type) => {
        for (let id in components) {
            const component = components[id];
            if (component.parent_id == component_id
                && component.component_type == component_map[component_type]) {
                return component;
            }
        }
        return null;
    }

// Retrieves immediate child components of specified component type. Ordered by the parent's order map.
export const getChildComponents =
    (components, component_id, component_type) => {
        // Maps component_id => order_id instead of vice versa.
        const inverted_order_map = 
            invertMap(components[component_id].order);
  
        const child_components = [];
        for (let id in components) {
            const component = components[id];
            if (component.parent_id == component_id
                && component.component_type == component_map[component_type]) {
                child_components.push(component);
            }
        }
        if (inverted_order_map !== undefined) {
            child_components
            .sort((componentA, componentB) => 
                inverted_order_map[componentA.id] < 
                inverted_order_map[componentB.id] ? 
                -1 : 1);
        }

        
        return child_components;
    }


// Creates component. Side effect is updating parent's order map.
export const createComponent = (
    components, 
    component_type, 
    parent_id, 
    content, 
    is_ordered) => {

    const new_component_id = calculateNextKey(components);
    
    // If component is ordered, update it's parent's order map.
    if (is_ordered) 
        addToParentOrderMap(components[parent_id].order, new_component_id, -1);

    return {
        id: new_component_id,
        component_type: component_map[component_type],
        parent_id,
        order: {},
        ...content,
    }
}


// If the component is ordered, update parent component's order map. Default behavior is to add the component to the end.
const addToParentOrderMap = (parent_order_map, component_id, order_id) => {
    if (order_id == -1) order_id = calculateNextKey(parent_order_map);
    shiftKeysForwards(parent_order_map, order_id);
    parent_order_map[order_id] = component_id;
}

export const removeFromParentOrderMap = (components, component_id) => {
    const parent_order_map = getParentOrderMap(components, component_id);

    const order_id = getOrderId(parent_order_map, component_id);
    if (order_id !== -1) shiftKeysBackwards(parent_order_map, order_id);
}

export const deleteComponent = (components, component_id) => {
    removeFromParentOrderMap(components, component_id);
    deleteAllChildComponents(components, component_id);
}

export const moveComponent = (components, component_id, order_id) => {
    removeFromParentOrderMap(components, component_id);
    addToParentOrderMap(components, component_id, order_id);
}



// Helper methods internal to this file.
const retrieveKeysInAscendingOrder = hash => {
    return Object
        .keys(hash)
        .map(x => parseInt(x))
        .sort((a, b) => a - b);
}
const retrieveKeysInDescendingOrder = hash => {
    return Object
        .keys(hash)
        .map(x => parseInt(x))
        .sort((a, b) => b - a);
}

export const calculateNextKey = hash => {
    const descKeys = retrieveKeysInDescendingOrder(hash);
    return descKeys.length === 0 ? 0 : descKeys[0] + 1;
}

const getOrderId = (map, id) => {
    for (let key in map) {
        if (map[key] === id) return key;
    }
    return -1;
}

const shiftKeysForwards = (map, order_id) => {
    const descKeys = retrieveKeysInDescendingOrder(map);
    for (let key of descKeys) {
        if (key >= order_id) {
            map[key + 1] = map[key];
        }
    }
}

const shiftKeysBackwards = (map, orderId) => {
    const descKeys = retrieveKeysInAscendingOrder(map);
    for (let key of descKeys) {
        if (key > orderId) {
            map[key - 1] = map[key]
        }
    }
}

const getParentOrderMap = (components, component_id) => {
    const component = components[component_id];
    return components[component.parent_id].order;
}
const getInverseParentOrderMap = (components, component_id) => {
    const component = components[component_id];
    console.log('component', component)
    const order_map = components[component.parent_id].order;
    return invertMap(order_map);
}

const invertMap = (map) => {
    if (map === undefined) return undefined;
    for (let k in map) {
        map[map[k]] = k;
    }
    return map;
}


export const deleteAllChildComponents = (components, component_id) => {
    for (let child_component in components) {
        if (child_component.parent_id == component_id) {
            deleteAllChildComponents(components, child_component.id);
        }
    }
    delete components[component_id];
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