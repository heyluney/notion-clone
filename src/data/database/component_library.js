export const getEmoji = (emoji) => {
    const emojis = {
        "rolling on the floor laughing": "1F923",
        "weary face": "1F62B",
        "person with crown": "1FAC5",
        "tooth": "1F9B4",
        "snow-capped mountain": "1F3D4 FE0F",
        "woman climbing": "1F9D7 1F3FB 200D 2640 FE0F",
        "backpack": "1F392",
        "dumpling": "1F95F",
        "sushi": "1F363",
        "notebook": "1F4D3",
        "scroll": "1F4DC",
        "full moon": "1F315",
        "France": "1F1EB 1F1F7",
        "dog": "1F415 200D 1F9BA"
    }

    return emojis[emoji];
}

// export const getRandomComponent = (component_library, component_type) => {
//     const components = component_library[component_type];
//     return components[Math.floor(Math.random() * components.length)];
// }

// export const getComponent = (component_library, component_type, component_key) => {
//     return component_library[component_type][component_key];
// }
// export const componentLibrary = {};


// const tags = [
//     "happy",
//     "sad",
//     "German Shepherd"];

// componentLibrary.tag = tags;

// const comments = [{
//     text: "Hi Clarky boy!",
//     timestamp: Date.now(),
//     edited: false
// },
// {
//     text: "Good job today Helen",
//     timestamp: Date.now(),
//     edited: false
// }]

// componentLibrary.comment = comments;


// // Who should own the categories in a tasklist 
// const tasklists =
//     [{
//         title: "First todo list",
//         categories: {
//             1: "Not Started",
//             2: "In Progress",
//             3: "Done"
//         }
//     },
//     {
//         title: "Clarks todos of today",
//         categories: {
//             1: "Nah",
//             2: "Maybehhh",
//             3: "YAYYYYYYY"
//         }
//     }]
// componentLibrary.tasklist = tasklists;

// const journals =
//     [{
//         title: "Untitled thoughts"

//     },
//     {
//         title: "Opinions on The Tortured Poets Department"
//     }]

// componentLibrary.journal = journals;

// const entries =
//     [{
//         title: "Going backpacking with Taylor <3",
//         body: "Going to mammoth lakes",
//         timestamp: Date.now(),
//         emoji: getRandomComponent(componentLibrary, "emoji"),
//         tags: [
//             getRandomComponent(componentLibrary, "tag"),
//             getRandomComponent(componentLibrary, "tag")
//         ]
//     },
//     {
//         title: "Taking Clark on a walk!",
//         body: "Will be good exercise ",
//         timestamp: Date.now(),
//         emoji: getRandomComponent(componentLibrary, "emoji"),
//         tags: ["Clark"]
//     },
//     {
//         title: "Checking out a new flavor at Salt & Straw",
//         body: "Want to eat the cinnamon snickerdoodle flavor.",
//         timestamp: Date.now(),
//         emoji: getRandomComponent(componentLibrary, "emoji"),
//         tags: ["ice cream", "snickerdoodle"],
//     },
//     {
//         title: "Short climbing session. Maybe sneak in a running session afterwards?",
//         body: "WORK HARD PLAY HARD",
//         timestamp: "1893348894855",
//         emoji: getRandomComponent(componentLibrary, "emoji"),
//         tags: []
//     }]
// componentLibrary.entry = entries;

// const tasks =
//     [{
//         title: "buy milk",
//         body: "Need to run to the grocery store tomorrow at 5 p.m.",
//         category_id: 1
//     },
//     {
//         title: "take Clark out",
//         body: "Or else he'll bark!",
//         category_id: 1,
//     },
//     {
//         title: "Go climbing",
//         body: "Crush that V5!",
//         category_id: 2,
//     },
//     {
//         title: "go to Yosemite",
//         body: "Climbing half dome",
//         category_id: 3
//     },
//     {
//         title: "Get mom to throw me the ball",
//         body: "She's busy staring at the black screen",
//         category_id: 2
//     },
//     {
//         title: "Make sure all the squirrels know I'm to be feared",
//         body: "Because they are the scoundrel of the earth",
//         category_id: 3
//     }]
// componentLibrary.task = tasks;

// componentLibrary.title = ["This could be a title", "Sending a V7!", "Working out"]
