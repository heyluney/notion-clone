

import { saveItem, getItem } from '../utils/local_storage';
import { pastelColors } from './color_constants';
// This seeds some data across various pages using local storage (so data
// persists between browser refreshes).

// TODO(helen): Double check that icons also work to substitute traditional emojis.
const defaultComments = {
    1: {
      comment: "Hi",
      edited: false,
      emojis:  
      {
        "1F923": 'rolling on the floor laughing',
        "1F62B": 'tired face'
      },
      timestamp: "1695669947591"
    },
    2: {
      comment: "Hello",
      edited: false,
      emojis:  
      {"1F923": 'rolling on the floor laughing'},
      timestamp: "1693348898325"
    }
};

const defaultJournal = {
    1: {
      title: "Going backpacking with Taylor <3",
      emoji: "1F923",
      tags: {
          "Canada": pastelColors["purple"],
          "backpacking": pastelColors["pink"],
          "hiking": pastelColors["orange"]
      },
      timestamp: "1693348898325",
      comments: defaultComments
    },
    2: {
      title: "Taking Clark on a walk!",
      emoji: "1F415",
      tags: {
        "dogs": pastelColors["green"],
        "Clark": pastelColors["green"]
      },
      timestamp: "1893348898325",
      comments: defaultComments
    },
    3: {
      title: "Checking out a new flavor at Salt & Straw",
      emoji: "1F366",
      tags: {},
      timestamp: "1893348894825",
      comments: {
        1: {
          comment: "Hmm that sounds good!",
          edited: false,
          emojis:  
          {"1F366": 'rolling on the floor laughing'},
          timestamp: "1293348898325"
        }
      }
    },
    4: {
      title: "Short climbing session. Maybe sneak in a running session afterwards?",
      emoji: "1F9D7 200D 2640",
      tags: {
        "v7": pastelColors["yellow"],
        "movement": pastelColors["blue"],
        "go hard or go home": pastelColors["yellow"]
      },
      timestamp: "1893348894855",
      comments: {
        1: {
          comment: "Interesting...", 
          edited: false,
          emojis: {},
          timestamp: "1293348898325"
        }
      }
    }
}


const defaultTodos = {
    1: {
      id: 1,
      title: "buy milk",
      emoji: "1F366",
      timestamp: "1893348894855",
      category: "undone",
      tags: {
        "Canada": pastelColors["purple"],
        "backpacking": pastelColors["pink"]
      }
    },
    2: {
      id: 2,
      title: "take Clark out",
      emoji: "1F415",
      timestamp: "1893348855855",
      category: "undone",
      tags: {}
    },
    3: {
      id: 3,
      title: "go climbing",
      emoji: "1F415",
      timestamp: "1893348855895",
      category: "doing",
      tags: {}
    },
    4:  {
      id: 4,
      title: "go to Yosemite",
      emoji: "1F415",
      timestamp: "1893348889895",
      category: "completed",
      tags: {}
    }
}

const defaultPages = {
    "Home": {
        idx: 0,
        name: "Home",
        path: "/notion-clone", 
        icon: '1F4A1', // Candle
        component: "Home"
    },
    "Quick Note": {
        idx: 1,
        name: "Quick Note", // Title of the page, must equal the key in defaultPages hash.
        path: "/notion-clone/quick_note",
        icon: '1F58B', // Fountain pen
        component: "QuickNote", // Stringified name of React component.
        comments: defaultComments
    },
    "Task List": {
        idx: 2,
        name: "Task List",
        path: "/notion-clone/task_list",
        icon: '1F4C4', // Scroll
        component: "TaskList",
        todos: defaultTodos,
        categories: ["undone", "doing", "completed"]
    },
    "Journal": {
        idx: 3,
        name: "Journal",
        path: "/notion-clone/journal",
        icon: '1F4D5',
        component: "Journal",
        entries: defaultJournal
    }
}

export const seedPages = () => {
    if (getItem('pages') === null) saveItem('pages', defaultPages);
}




