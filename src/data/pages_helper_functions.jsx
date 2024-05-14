import { useContext } from "react";
import { PageContext } from "../App";

import { calculateNextKey, shiftAllKeys } from "../utils/calculate_next_key";
import { componentMap, componentType } from "./component_map";
// Note: All functions are pure functions - create a copy of the original state before modifying.

export const findEmoji = (emojis, componentType, componentId) => {
    for (let emoji of Object.values(emojis)) {
        if (emoji.component_type == componentMap[componentType] && emoji.component_id == componentId) {
            return emoji.emoji;
        }
    }
    return "1F415"; // Dog placeholder emoji if no emoji is found.
}

// For finding a single element.
// export const findComponent = (database, id) => {
//     return Object.entries(database)
//     .filter(
//         ([idx, component]) => 
//             component.parent_page_id == parentPageId
//     )
//     .sort(
//         (a, b) => a[1].order_id - b[1].order_id
//     );

//     for (let component of Object.values(database)) {
//         if (component.component_type == componentMap[componentType] && component.component_id == componentId) {
//             return component;
//         }
//     }
//     return -1;
// }

// findComponents vs. findNestedComponents 

// E.g. Components are page-level.


export const addComponent = (database, newComponent, previousOrderId, nextOrderId) => {
    if (nextOrderId !== -1) shiftAllKeys(nextOrderId);
    database[previousOrderId+1]= newComponent;
}