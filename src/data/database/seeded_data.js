
import { componentLibrary, getRandomComponent } from './component_library';
import { saveToLocalStorage, getFromLocalStorage } from './database_functions';

import { component_map } from './component_map';

// This seeds some data across various pages using local storage (so data persists between clearing local storage).

// Retrieves a random component in the pre-seeded library.


// id, component_type, parent_id, children, then attributes 
const defaultComponents = {
    0: {
        id: 0,
        component_type: component_map['app'],
        parent_id: -1,
        children: [1, 2, 3, 4],
        title: "Clark's Notion!",
    },
    1: {
        id: 1,
        component_type: component_map['page'],
        parent_id: 0,
        children: [],
        title: "Home",
        emoji: getRandomComponent(componentLibrary, "emoji")
    },
    2: {
        id: 2,
        component_type: component_map['page'],
        parent_id: 0,
        children: [6, 10, 11],
        title: "Quick Note",
        emoji: getRandomComponent(componentLibrary, "emoji")
    },
    3: {
        id: 3,
        component_type: component_map['page'],
        parent_id: 0,
        children: [],
        title: "Task List",
        emoji: getRandomComponent(componentLibrary, "emoji")
    },
    4: {
        id: 4,
        component_type: component_map['page'],
        parent_id: 0,
        children: [14],
        title: "Journal",
        emoji: getRandomComponent(componentLibrary, "emoji")
    },
    6: {
        id: 6,
        component_type: component_map['tasklist'],
        parent_id: 2,
        children: [7, 8, 9],
        ...getRandomComponent(componentLibrary, "tasklist"),
    },
    7: {
        id: 7,
        component_type: component_map['task'],
        parent_id: 6,
        children: [],
        ...getRandomComponent(componentLibrary, "task"),
    },
    8: {
        id: 8,
        component_type: component_map['task'],
        parent_id: 6,
        children: [],
        ...getRandomComponent(componentLibrary, "task"),
    },
    9: {
        id: 9,
        component_type: component_map['task'],
        parent_id: 6,
        children: [],
        ...getRandomComponent(componentLibrary, "task"),
    },
    10: {
        id: 10,
        component_type: component_map['journal'],
        parent_id: 2,
        children: [12, 13],
        ...getRandomComponent(componentLibrary, "journal")
    },
    11: {
        id: 11,
        component_type: component_map['comment'],
        parent_id: 2,
        children: [],
        ...getRandomComponent(componentLibrary, "comment")
    },
    12: {
        id: 12,
        component_type: component_map['entry'],
        parent_id: 10,
        children: [],
        ...getRandomComponent(componentLibrary, "entry"),
    },
    13: {
        id: 13,
        component_type: component_map['entry'],
        parent_id: 10,
        children: [],
        ...getRandomComponent(componentLibrary, "entry"),
    },
    14: {
        id: 14,
        component_type: component_map['journal'],
        parent_id: 4,
        children: [15],
        ...getRandomComponent(componentLibrary, "journal")
    },
    15: {
        id: 15,
        component_type: component_map['entry'],
        parent_id: 14,
        children: [],
        title: "Taylor swift!!!!",
        body: "Going to see the eras tour.",
        timestamp: Date.now(),
        emoji: getRandomComponent(componentLibrary, "emoji"),
        tags: ["swiftie 4 lyfe"]
    }
};


export const seedPages = () => {
    localStorage.clear(); // Will remove this eventually.
    if (getFromLocalStorage('components') === null)
        saveToLocalStorage('components', defaultComponents);
}