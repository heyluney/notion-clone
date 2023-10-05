import { useState, useEffect, useRef, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

import { generateFavicon, addFaviconToPage } from './utils/generate_favicon';
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

  // TODO(helen): Double check that icons also work to substitute traditional emojis.
  const defaultPages = {
    "Quick Note": {
      idx: 0, 
      name: "Quick Note", // Title of the page, must equal the key in defaultPages hash.
      path: "/quick_note", 
      icon: '1F32D', 
      component: "QuickNote" // Stringified name of React component.
    },
    "Task List": {
      idx: 1,
      name: "Task List",
      path: "/task_list",
      icon: '1F32D',
      component: "TaskList"
    },
  }
  if (getItem('pages') === null) saveItem('pages', defaultPages);
  const [pages, changePages] = useState(getItem('pages'));

  const defaultCurrentPageName = "Task List";
  if (getItem('current_page_name') === null) saveItem('current_page_name', defaultCurrentPageName);
  const [currentPageName, changeCurrentPageName] = useState(getItem('current_page_name'));

  // Determines global state for whether a popup is currently open or not.
  const [popup, togglePopup] = useState(null);
  addFaviconToPage(pages[currentPageName].icon);
  return (
    <PageContext.Provider value={{ currentPageName, changeCurrentPageName, 
                                      pages, changePages }}>
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