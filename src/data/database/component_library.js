export const getRandomComponent = (component_library, component_type) => {
    const components = component_library[component_type];
    return components[Math.floor(Math.random() * components.length)];
}

export const componentLibrary = {};

const emojis = [
    "1F923",
    "1F62B",
    "1FAC5",
    "1F9B4",
    "1F3D4 FE0F",
    "1F9D7 1F3FB 200D 2640 FE0F",
    "1F392"];
componentLibrary.emoji = emojis;

const tags = [
    "happy",
    "sad",
    "German Shepherd"];

componentLibrary.tag = tags;

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

componentLibrary.comment = comments;


const tasklists =
    [{
        title: "First todo list"
    },
    {
        title: "Clarks todos of today"
    }]
componentLibrary.tasklist = tasklists;

const journals =
    [{
        title: "Untitled thoughts"

    },
    {
        title: "Opinions on The Tortured Poets Department"
    }]

componentLibrary.journal = journals;

const entries =
    [{
        title: "Going backpacking with Taylor <3",
        body: "Going to mammoth lakes",
        timestamp: Date.now(),
        emoji: getRandomComponent(componentLibrary, "emoji"),
        tags: [
            getRandomComponent(componentLibrary, "tag"),
            getRandomComponent(componentLibrary, "tag")
        ]
    },
    {
        title: "Taking Clark on a walk!",
        body: "Will be good exercise ",
        timestamp: Date.now(),
        emoji: getRandomComponent(componentLibrary, "emoji"),
        tags: ["Clark"]
    },
    {
        title: "Checking out a new flavor at Salt & Straw",
        body: "Want to eat the cinnamon snickerdoodle flavor.",
        timestamp: Date.now(),
        emoji: getRandomComponent(componentLibrary, "emoji"),
        tags: ["ice cream", "snickerdoodle"],
    },
    {
        title: "Short climbing session. Maybe sneak in a running session afterwards?",
        body: "WORK HARD PLAY HARD",
        timestamp: "1893348894855",
        emoji: getRandomComponent(componentLibrary, "emoji"),
        tags: []
    }]
componentLibrary.entry = entries;

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
componentLibrary.task = tasks;

componentLibrary.title = ["This could be a title", "Sending a V7!", "Working out"]
