import { useState, useEffect, useRef, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

import populateEmojiDictionary from './components/popups/populateEmojiDictionary';

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
  // I don't want populateemojiDictionary to run every single time
  if (getItem('emoji_dictionary') === null) populateEmojiDictionary();
  if (getItem('emoji_dictionary_skintone') === null) {
    saveItem('emoji_dictionary_skintone', 'none');
  }

  const defaultComments = {};
  if (getItem('quicknote-comments') === null) saveItem('quicknote-comments', defaultComments);
  const [comments, changeComments] = useState(getItem('quicknote-comments'));

  // used to be Earmark, Scissors
  const defaultPages = [{
    "Quick Note": ["Quick Note", "/quick_note", '1F9A1', "QuickNote"],
    "Task List": ["Task List", "/task_list", '1F32D', "TaskList"]
  }, "Quick Note"];

  if (getItem('pages') === null) saveItem('pages', defaultPages);
  const [pages, changePages] = useState(getItem('pages'));

  function faviconTemplate(hexcode) {
    return `data:image/svg+xml,
    <svg xmlns=%22http://www.w3.org/2000/svg%22 
    viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>
      ${computeEmoji(hexcode)}
    </text></svg>`
  }

  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  const [allPages, active] = pages;
  const [_, __, hex, ___] = allPages[active];
  link.href = faviconTemplate(hex);


  return (
    <PageContext.Provider value={{ pages, changePages }}>
      <CommentContext.Provider value={{ comments, changeComments }}>
          <Fragment>
            <div className={styles.app}>
              <SideBar />
              <Main />
            </div>
          </Fragment>
      </CommentContext.Provider>
    </PageContext.Provider>
  )
}

export default App;

export const CommentContext = createContext();
export const PageContext = createContext();


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