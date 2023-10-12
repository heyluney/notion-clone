

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
      title: "Just checking how asjd f;alskdj f;laksjd f;laksj df;lkasj df;klasj df;kaljsd f;aksjd fa;sjdf a;slkdj fa;lksjd f;aslkdj f;askdj fa;sdkj fa;lskd jfa;slkd jf;aslk jdf;alskd jfasdf",
      emoji: "1F366",
      tags: {},
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

const defaultPages = {
    "Home": {
        idx: 0,
        name: "Home",
        path: "/", 
        icon: '1F4D8',
        component: "Home"
    },
    "Quick Note": {
        idx: 1,
        name: "Quick Note", // Title of the page, must equal the key in defaultPages hash.
        path: "/quick_note",
        icon: '1F32D',
        component: "QuickNote", // Stringified name of React component.
        comments: defaultComments
    },
    "Task List": {
        idx: 2,
        name: "Task List",
        path: "/task_list",
        icon: '1F32D',
        component: "TaskList",
    },
    "Journal": {
        idx: 3,
        name: "Journal",
        path: "/journal",
        icon: '1F4D8',
        component: "Journal",
        entries: defaultJournal
    }
}

export const seedPages = () => {
    if (getItem('pages') === null) saveItem('pages', defaultPages);
}




