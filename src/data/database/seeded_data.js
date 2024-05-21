
import { getRandomComponent, createComponent, 
    saveToLocalStorage, getFromLocalStorage } from './database_functions';

import { component_map } from './component_map';

// This seeds some data across various pages using local storage (so data persists between clearing local storage).

const tasklists = 
    [{
        title: "First todo list"
    },
    {
        title: "Clarks todos of today"
    }]

const journals =
    [{
        title: "Untitled thoughts"
        
    },
    {
        title: "Opinions on The Tortured Poets Department"
    }]

const entries =
    [{
        title: "Going backpacking with Taylor <3",
        body: "Going to mammoth lakes",
        timestamp: Date.now(),
    },
    {
        title: "Taking Clark on a walk!",
        body: "Will be good exercise ",
        timestamp: Date.now(),
    },
    {
        title: "Checking out a new flavor at Salt & Straw",
        body: "Want to eat the cinnamon snickerdoodle flavor.",
        timestamp: Date.now(),
    },
    {
        title: "Short climbing session. Maybe sneak in a running session afterwards?",
        body: "WORK HARD PLAY HARD",
        timestamp: "1893348894855",
    }]

const tasks =
    [{
        title: "buy milk",
        body: "Need to run to the grocery store tomorrow at 5 p.m.",
    },
    {
        title: "take Clark out",
        body: "Or else he'll bark!",
    },
    {
        title: "Go climbing",
        body: "Crush that V5!",
    },
    {
        title: "go to Yosemite",
        body: "Climbing half dome"
    },
    {
        title: "Get mom to throw me the ball",
        body: "She's busy staring at the black screen"
    },
    {
        title: "Make sure all the squirrels know I'm to be feared",
        body: "Because they are the scoundrel of the earth"
    }]

const emojis = [{
    emoji: "1F923"
},
{
    emoji: "1F62B"
},
{
    emoji: "1FAC5"
},
{
    emoji: "1F9B4"
},
{
    emoji: "1F3D4 FE0F"
},
{
    emoji: "1F9D7 1F3FB 200D 2640 FE0F"
},
{
    emoji: "1F392"
}]

const tags = [{
    tag: "happy"
},
{
    tag: "sad"
},
{
    tag: "German Shepherd"
}]

const comments = [{
    text: "Hi Clarky boy!",
    timestamp: Date.now(),
    edited: false
},
{
    text: "Good job today Helen",
    timestamp: Date.now(),
    edited: false
}]

const componentLibrary = {
    tasklist: tasklists,
    journal: journals,
    entry: entries,
    task: tasks,
    emoji: emojis,
    comment: comments,
    tag: tags
}

const defaultComponents = {
    0: {
        id: 0,
        component_type: component_map['app'],
        order: {
            1: 4,
            2: 3,
            3: 2,
            4: 1
        } // page order determines order of items in sidebar
    },
    1: {
        id: 1,
        component_type: component_map['page'],
        parent_id: 0,
        title: "Home",
        order: {}
    },
    2: {
        id: 2,
        component_type: component_map['page'],
        parent_id: 0,
        title: "Quick Note",
        order: {}
    },
    3: {
        id: 3,
        component_type: component_map['page'],
        parent_id: 0,
        title: "Task List",
        order: {}
    },
    4: {
        id: 4,
        component_type: component_map['page'],
        parent_id: 0,
        title: "Journal",
        order: {}
    },
    5: {
        id: 5,
        component_type: component_map['emoji'],
        parent_id: 2,
        ...getRandomComponent(componentLibrary, "emoji")
    },
    6: {
        id: 6,
        component_type: component_map['tasklist'],
        parent_id: 2,
        ...getRandomComponent(componentLibrary, "tasklist"),
        order: {
            1: 7,
            2: 8,
            3: 9
        }
    },
    7: {
        id: 7,
        component_type: component_map['task'],
        parent_id: 6,
        ...getRandomComponent(componentLibrary, "task"),
    },
    8: {
        id: 8,
        component_type: component_map['task'],
        parent_id: 6,
        ...getRandomComponent(componentLibrary, "task"),
    },
    9: {
        id: 9,
        component_type: component_map['task'],
        parent_id: 6,
        ...getRandomComponent(componentLibrary, "task"),
    },
    10: {
        id: 10,
        component_type: component_map['journal'],
        parent_id: 2,
        ...getRandomComponent(componentLibrary, "journal")
    }
};




export const seedPages = () => {
    localStorage.clear(); // Will remove this eventually.
    if (getFromLocalStorage('components') === null)
        saveToLocalStorage('components', defaultComponents);
}