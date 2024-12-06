
import { componentLibrary, getRandomComponent, getComponent  } from './component_library';
import { saveToLocalStorage, getFromLocalStorage, createDefaultTaskList, calculateNextKey } from './database_functions';

import { component_map, default_component_map } from './component_map';

// This seeds components across various pages using local storage (so data persists between clearing local storage).

// Each component has the following data:
    // id : A unique identifier across the entire application.
    // parent_id : A unique identifier of a component's parent component.
    // children : An ordered array of child component_id's.

    // All other keys represent component-specific attributes.


// Maybe add some validation that if something refers to a parent_id, then that parent component includes it in it's children?


// seeded data and "default skeletons" should share similar 
// const app = createNewDefaultComponent("app")

// const tasklist1 = createNewDefaultComponent("tasklist")

// retrieveLatestKey 
// createComponent

// export const createComponent = (
//     components,
//     component_type,
//     parent_id,
//     content = default_content_map[component_type],
//     order_id = components[parent_id].children.length 
// )

// each component can have one of three things
// (1) parent id
// (2) child ids
// (3) attributes (these are on the component itself)


// componentA    componentB

// when we seed a component we need to: 
// (1) know what parent component that component belongs to
// (2) know what attributes that component has

// component_type is this necessary?
// I think this is so we can provide the default styling for such a component??

// the component type is only necessary to distinguish the UI
// e.g. a "comment" doesn't really mean anything, it's just a bunch of data (indistinguishable from a title)
// but a "comment" UI-wise looks different from a "title", 
// createComponent(parentId, componentType, attributes)

// order is necessary for child components
// order_id specifies the index in the children's array

// id is unique key in components hash

// <Component data={}/>
// 5 things in a component
    // id (unique identifier)
    // parent_id 
    // children array
    // content (local to the object itself)
    // component_type: how do we want to visually represent this data

    // do we even need component_type, i don't think so
    // cause we will just give the react component the entire state
    // we give the burden to the user of using the correct react component with with the correct data component


let components = {};

// This function has a side effect of modifying defaultComponents hash map. Side effects are OK in the seeded version of createComponent.
// content is standardized for each component
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
        component_type: component_map[component_type],
        content: content // object that represents information k-v pairs about information 
    }
    components[newComponent.id] = newComponent;
    if (newComponent.parent_id !== null) components[newComponent.parent_id].children.push(id);
    return newComponent;
}

// for seeding purposes order doesn't matter
// createBlah(componentType, parentId) 
// if id, parent_id, children are all shared across the objects, 

const app = createComponent("app", null, {title: "Temp title"});
const page1 = createComponent("page", app.id, {
    title: "Home",
    emoji: getComponent(componentLibrary, "emoji", "sushi")
})
const page2 = createComponent("page", app.id, {
    title: "Quick Note",
    emoji: getComponent(componentLibrary, "emoji", "notebook")
})

//     2: {
//         id: 2,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [6, 13, 14],
//         title: "Quick Note",
//         emoji: getComponent(componentLibrary, "emoji", "notebook")
//     },

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
//     3: {
//         id: 3,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [],
//         title: "Task List",
//         emoji: getComponent(componentLibrary, "emoji", "scroll")
//     },
//     4: {
//         id: 4,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [17],
//         title: "Journal",
//         emoji: getComponent(componentLibrary, "emoji", "full moon")
//     },
//     5: {
//         id: 5,
//         component_type: component_map['page'],
//         parent_id: 0,
//         children: [],
//         title: "French Notecards",
//         emoji: getComponent(componentLibrary, "emoji", "France")
//     },
//     6: {
//         id: 6,
//         component_type: component_map['tasklist'],
//         parent_id: 2,
//         children: [7, 8, 9],
//         title: "Clarks todos of today",
//     },
//     7: {
//         id: 7,
//         component_type: component_map['category'],
//         parent_id: 6,
//         children: [10, 11],
//         title: "Nah"
//     },
//     8: {
//         id: 8,
//         component_type: component_map['category'],
//         parent_id: 6,
//         children: [19, 20, 21],
//         title: "Maybehhh",
//     },
//     9: {
//         id: 9,
//         component_type: component_map['category'],
//         parent_id: 6,
//         children: [12, 22],
//         title: "YAYY!!"
//     },
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

export const seedPages = () => {
    if (getFromLocalStorage('components') === null) {
        console.log('components', components)
        saveToLocalStorage('components', components);
    }
        
}