import { useState, useEffect, useRef, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

import { generateFavicon } from './utils/generate_favicon';
import populateEmojiDictionary from './components/popups/populateEmojiDictionary';
import Popup from './components/popups/Popup';
import {
  LuClock9 as Clock,
  LuImport as Import
} from 'react-icons/lu';
import {
  FaSearch as Search,
  FaPlusCircle as Plus,
  FaShapes as Shapes
} from 'react-icons/fa';
import {
  BsGearFill as Gear,
  BsFileEarmark as Earmark,
  BsScissors as Scissors,
  BsBookFill as Book,
  BsBookHalf as Book2,
  BsPlus as Plus2,
  BsFillPeopleFill as People,
  BsTrash2Fill as Trash
} from 'react-icons/bs';

import { saveItem, getItem } from './utils/local_storage';
import { computeEmoji } from './utils/compute_emojis';

const App = () => {
  if (getItem('emoji_dictionary') === null) populateEmojiDictionary();
  if (getItem('emoji_dictionary_skintone') === null) {
    saveItem('emoji_dictionary_skintone', 'none');
  }

  const defaultComments = {
    1: {
      comment: "Hi",
      edited: false,
      emojis:  
      {"1F923": 'rolling on the floor laughing',
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
  if (getItem('quicknote-comments') === null) saveItem('quicknote-comments', defaultComments);
  const [comments, changeComments] = useState(getItem('quicknote-comments'));

  // used to be Earmark, Scissors
  const defaultPages = [{
    "Quick Note": [0, "Quick Note", "/quick_note", '1F32D', "QuickNote"],
    "Task List": [1, "Task List", "/task_list", '1F32D', "TaskList"]
  }, "Quick Note"];

  if (getItem('pages') === null) saveItem('pages', defaultPages);
  const [pages, changePages] = useState(getItem('pages'));

  // Determines global state for whether a popup is currently open or not.
  const [popup, togglePopup] = useState(null);

  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  const [allPages, active] = pages;
  const [_, name, ___, icon, ____] = allPages[active];
  link.href = generateFavicon(icon);
  return (
    <PageContext.Provider value={{ 
        pages, 
        changePages, 
        icon, 
        name }}>
      <CommentContext.Provider value={{ comments, changeComments }}>
        <PopupContext.Provider value={{ popup, togglePopup }}>
          <Fragment>
            <div className={`${styles.app}`}>
              <SideBar />
              <Main />
            </div>
              {popup && <Popup />}
              <div className={styles.emoji_overlay} 
                  style={{display: popup === null  || popup.startsWith('Delete') ? 'none': 'block'}}>
              </div>
               <div className={styles.popup_overlay}
                  style={{display: popup === null || !popup.startsWith('Delete') ? 'none' : 'block'}}
                >
              </div>
          </Fragment>
        </PopupContext.Provider>
      </CommentContext.Provider>
    </PageContext.Provider>
  )
}

export default App;

export const CommentContext = createContext();
export const PageContext = createContext();
export const PopupContext = createContext();

    // "Search": [Search, false],
    // "Updates": [Clock, false],
    // "Settings & members": [Gear, false],
    // "New page": [Plus, false],

    // "Getting Started": [Earmark, true],
    // "Personal Home": [Earmark, true],

    // "Journal": [Book, true],
    // "Reading List": [Book2, true],
    // "Untitled": [Earmark, true],
    // "Add a page": [Plus2, true],

    // "Create a teamspace": [People, false],
    // "Templates": [Shapes, false],
    // "Import": [Import, false],
    // "Trash": [Trash, false]