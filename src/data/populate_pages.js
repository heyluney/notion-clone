

import { saveItem, getItem } from '../utils/local_storage';
import { pastelColors } from './color_constants';
// This seeds some data across various pages using local storage (so data
// persists between clearing local storage).

// TODO(helen): Double check that icons also work to substitute traditional emojis.
const defaultPages = {
  0: "Home",
  1: "Quick Note", 
  2: "Task List",
  3: "Journal"
}

const defaultComments = {
  1: {
    comment: "Hi",
    edited: false,
    entity_type: 1,
    entity_id: 1,
    timestamp: "1695669947591"
  },
  2: {
    comment: "Hello",
    edited: false,
    entity_type: 1,
    entity_id: 1,
    timestamp: "1693348898325"
  }
}

const defaultEmojis = {
  1: {
    emoji: "1F923",
    entity_type: 2,
    entity_id: 1
  },
  2: {
    emoji: "1F62B",
    entity_type: 2,
    entity_id: 2
  },
  3: {
    emoji: "1FAC5",
    entity_type: 1,
    entity_id: 1
  },
  4: {
    emoji: "1F62B",
    entity_type: 1,
    entity_id: 2
  },
  5: {
    emoji: "1F923",
    entity_type: 1,
    entity_id: 3
  }
}

const defaultCategories = {
  1: "undone",
  2: "doing",
  3: "done",
  4: "road trips"
}

const defaultTodos = {
  1: {
    todo: "buy milk",
    timestamp: "1893348894855",
    category_id: 1,
  },
  2: {
    todo: "take Clark out",
    timestamp: "1893348855855",
    category_id: 1,
  },
  3: {
    todo: "go climbing",
    timestamp: "1893348855895",
    category_id: 2,
  },
  4:  {
    todo: "go to Yosemite",
    timestamp: "1893348889895",
    category_id: 3,
  },
  5: {
    todo: "visit Cindy and Josiah",
    timestamp: "1893348889895",
    category_id: 4,
  }
}


const defaultJournal = {
    1: {
      journal: "Going backpacking with Taylor <3",
      timestamp: "1693348898325",
    },
    2: {
      journal: "Taking Clark on a walk!",
      timestamp: "1893348898325",
    },
    3: {
      journal: "Checking out a new flavor at Salt & Straw",
      timestamp: "1893348894825",
    },
    4: {
      journal: "Short climbing session. Maybe sneak in a running session afterwards?",
      timestamp: "1893348894855",
    }
}



export const seedPages = () => {
  if (getItem('pages') === null) saveItem('pages', defaultPages);
  if (getItem('emojis') === null) saveItem('emojis', defaultEmojis);
  if (getItem('comments') === null) saveItem('comments', defaultComments);
  if (getItem('categories') === null) saveItem('categories', defaultCategories);
  if (getItem('todos') === null) saveItem('todos', defaultTodos);
  if (getItem('journal') === null) saveItem('journal', defaultJournal);
}
