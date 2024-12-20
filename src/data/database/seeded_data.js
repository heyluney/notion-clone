
import { getEmoji  } from './component_library';
import { calculateNextKey } from './database_functions';

import { component_map, default_component_map } from './component_map';


/* 
Tips: Try to make sure typescript version is compatible with react version (since TSX and JSX are both used in this project), currently it says TS 4.6 is compatible with React 18.2, so that is used. To udpate the versions, go to package.json, and update manually, then run:

 rm -rf node_modules
 npm install
*/

// This seeds components across various pages using local storage (so data persists between clearing local storage).

// Each component has the following data:
    // id : A unique identifier across the entire application.
    // parent_id : A unique identifier of a component's parent component.
    // children : An ordered array of child component_id's. The order matters and determines the order the children are displayed.
    // All other keys represent component-specific attributes.

let components = {};

// Seeded version of createComponent. Side effects are OK.
const createComponent = 
(
    component_type, 
    parent_id = -1, 
    content = default_component_map[component_type]
) => {
    const id = calculateNextKey(components);

    const newComponent = {
        id: id, // get unique key
        parent_id: parent_id, // set parent_id
        children: [], // set empty children
        component_type: component_type,
        content: content // object that represents information k-v pairs about information 
    }
    components[newComponent.id] = newComponent;
    if (newComponent.parent_id !== null) components[newComponent.parent_id].children.push(id);
    return newComponent;
}

// for seeding purposes order doesn't matter
// createBlah(componentType, parentId) 
// if id, parent_id, children are all shared across the objects, 

const app = createComponent("App", null, {title: "Temp title"});
const homePage = createComponent("Page", app.id, {
    title: "Home",
    emoji: getEmoji("sushi")
})
const quickNotePage = createComponent("Page", app.id, {
    title: "Quick Note",
    emoji: getEmoji("notebook")
})
const taskListPage = createComponent("Page", app.id, {
    title: "Task List",
    emoji: getEmoji("scroll")
})
const journalPage = createComponent("Page", app.id, {
    title: "Journal",
    emoji: getEmoji("full moon")
})
const noteCardPage = createComponent("Page", app.id, {
    title: "French Notecards",
    emoji: getEmoji("France")
})
const clarksTaskList = createComponent("TaskList", taskListPage.id, {
    title: "Clark's Todos of today"
})
const noCategory = createComponent("Category", clarksTaskList.id, {
    title: "Nah not feeling it"
})
const maybeCategory = createComponent("Category", clarksTaskList.id, {
    title: "maybeehhh"
})
const yesCategory = createComponent("Category", clarksTaskList.id, {
    title: "Yayyy!"
})
const ballTask = createComponent("Task", yesCategory.id, {
    title: "Get mom to throw me the ball...about a million times!",
    body: "She's too busy staring at her laptop...:("
})




//     10: {
//         id: 10,
//         component_type: component_map['task'],
//         parent_id: 7,
//         children: [],
//         title: "Get mom to throw me the ball",
//         body: "She's busy staring at the black screen",
//     },
//     11: {
//         id: 11,
//         component_type: component_map['task'],
//         parent_id: 7,
//         children: [],
//         title: "Try to get to the tissue paperrrrr",
//         body: "Pay attention to ME!",
//     },
//     12: {
//         id: 12,
//         component_type: component_map['task'],
//         parent_id: 9,
//         children: [],
//         title: "Dog park time!",
//         body: "Maybe Oreo will play with me",
//     },
//     13: {
//         id: 13,
//         component_type: component_map['journal'],
//         parent_id: 2,
//         children: [15, 16, 23, 24],
//         title: "Random musings"
//     },
//     14: {
//         id: 14,
//         component_type: component_map['comment'],
//         parent_id: 2,
//         children: [],
//         text: "Hi Clarky boy!",
//         timestamp: Date.now(),
//         edited: false
//     },
//     15: {
//         id: 15,
//         component_type: component_map['entry'],
//         parent_id: 13,
//         children: [],
//         title: "Taking Clark on a walk!",
//         body: "Will be good exercise ",
//         timestamp: Date.now(),
//         emoji: getComponent(componentLibrary, "emoji", "dog"),
//         tags: ["Clark"]
//     },
//     16: {
//         id: 16,
//         component_type: component_map['entry'],
//         parent_id: 10,
//         children: [],
//         title: "Going backpacking with Taylor <3",
//         body: "Going to mammoth lakes",
//         timestamp: Date.now(),
//         emoji: getComponent(componentLibrary, "emoji", "snow-capped mountain"),
//         tags: ["mammoth lakes", "hiking", "exercise"]
//     },
//     17: {
//         id: 17,
//         component_type: component_map['journal'],
//         parent_id: 4,
//         children: [18],
//         title: "Opinions on The Tortured Poets Department"
//     },
//     18: {
//         id: 18,
//         component_type: component_map['entry'],
//         parent_id: 17,
//         children: [],
//         title: "Taylor swift!!!!",
//         body: "Going to see the eras tour.",
//         timestamp: Date.now(),
//         emoji: getRandomComponent(componentLibrary, "emoji"),
//         tags: ["swiftie 4 lyfe"]
//     },
//     19: {
//         id: 19,
//         component_type: component_map['task'],
//         parent_id: 8,
//         children: [],
//         title: "Chew on ma boneee",
//         body: "Nom nom nom",
//     },
//     20: {
//         id: 20,
//         component_type: component_map['task'],
//         parent_id: 8,
//         children: [],
//         title: "Try to steal some food off the dining table",
//         body: "What? I'mn innocent"
//     },
//     21: {
//         id: 21,
//         component_type: component_map['task'],
//         parent_id: 8,
//         children: [],
//         title: "Maybe find a stick and play",
//         body: "But it's so hot outside"
//     },
//     22: {
//         id: 22,
//         component_type: component_map['task'],
//         parent_id: 9,
//         children: [],
//         title: "Survey mom carefully as she bakes me more homemade dog treats",
//         body: "One can never be too careful"
//     },
//     23: {
//         id: 23,
//         component_type: component_map['entry'],
//         parent_id: 13,
//         children: [],
//         title: "Eating some hot cheetos",
//         body: "Will undo the work of V7 trying hard",
//         timestamp: Date.now(),
//         emoji: getComponent(componentLibrary, "emoji", "dumpling"),
//         tags: ["junkfood"]
//     },
//     24: {
//         id: 24,
//         component_type: component_map['entry'],
//         parent_id: 13,
//         children: [],
//         title: "Chocolate tasting",
//         body: "Better than wine?",
//         timestamp: Date.now(),
//         emoji: getComponent(componentLibrary, "emoji", "person with crown"),
//         tags: ["dark chocolate", "milk chocolate"]
//     },
// };

// defaultComponents = createDefaultTaskList(defaultComponents, 2);


export const seedStyles = () => {
    localStorage.setItem('global_styles', JSON.stringify({
        "sideBarWidth": 300,
        "nightMode": false,
    }));
}

export const seedComponents = () => {
    localStorage.setItem('components', JSON.stringify(components));
}

// const homePage = createComponent({
//     id: 
// })
// let defaultComponents = {
//     0: {
//         id: 0,
//         component_type: component_map['app'],
//         parent_id: -1,
//         children: [1, 2, 3, 4, 5],
//         title: "Clark's Notion!",
//     },
//     1: {
//         id: 1,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [],
//         title: "Home",
//         emoji: getComponent(componentLibrary, "emoji", "sushi")
//     },
//     2: {
//         id: 2,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [6, 13, 14],
//         title: "Quick Note",
//         emoji: getComponent(componentLibrary, "emoji", "notebook")
//     },