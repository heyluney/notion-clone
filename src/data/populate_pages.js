import { saveItem, getItem } from '../utils/local_storage';
import { capitalize } from '../utils/capitalize';

// This allows us to dynamically pull up current page as the page associated with
// the relevant url as default behavior.
const getCurrentPage = () => {
    const parts = window.location.href.split("/");
    const last = parts[parts.length-1]; // Last part of url 
    const componentName = last.split('_').map(word => capitalize(word)).join(' ');
    return componentName;
}
const defaultCurrentPageName = getCurrentPage();
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
      tags: ["Canada", "backpacking", "hiking", "blah", "blah1", "blah2",
      "blah3", "blah4", "blah5", "blah6", "blah7", "blah8", "blah9"],
      timestamp: "1693348898325"
    },
    2: {
      title: "Taking Clark on a walk!",
      emoji: "1F415",
      tags: ["dogs", "Clark"],
      timestamp: "1893348898325"
    },
    3: {
      title: "Checking out a new flavor at Salt & Straw",
      emoji: "1F366",
      tags: ["cinnamon snickerdoodle"],
      timestamp: "1893348894825"
    }
}

const defaultPages = {
    "Quick Note": {
        idx: 0,
        name: "Quick Note", // Title of the page, must equal the key in defaultPages hash.
        path: "/quick_note",
        icon: '1F32D',
        component: "QuickNote", // Stringified name of React component.
        comments: defaultComments
    },
    "Task List": {
        idx: 1,
        name: "Task List",
        path: "/task_list",
        icon: '1F32D',
        component: "TaskList",
    },
    "Journal": {
        idx: 2,
        name: "Journal",
        path: "/journal",
        icon: '1F4D8',
        component: "Journal",
        entries: defaultJournal
    }
}

export const seedPages = () => {
    if (getItem('pages') === null) saveItem('pages', defaultPages);
    if (getItem('current_page_name') === null) saveItem('current_page_name', defaultCurrentPageName);
}




