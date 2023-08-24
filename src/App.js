import { useState, useEffect, useRef, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

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



const App = () => {
  const components = {
    "Search": [Search, false],
    "Updates": [Clock, false],
    "Settings & members": [Gear, false],
    "New page": [Plus, false],

    "Getting Started": [Earmark, true],
    "Quick Note": [Earmark, true],
    "Personal Home": [Earmark, true],
    "Task List": [Scissors, true],
    "Journal": [Book, true],
    "Reading List": [Book2, true],
    "Untitled": [Earmark, true],
    "Add a page": [Plus2, true],

    "Create a teamspace": [People, false],
    "Templates": [Shapes, false],
    "Import": [Import, false],
    "Trash": [Trash, false]
  };
  const [page, changePage] = useState(["Search", Search]);
  const [popup, togglePopup] = useState(false);

  // first we will only do comments for quicknote, but we will reverse this
  
  if (localStorage.getItem('quicknote-comments') == null)
    localStorage.setItem('quicknote-comments', JSON.stringify({}));

  const [comments, addComment] = useState(
      JSON.parse(localStorage.getItem('quicknote-comments'))
  );
  return (
    <PopupContext.Provider value={{popup, togglePopup}}>
      <CommentContext.Provider value={{comments, addComment}}>
          <Fragment>
          <div className={styles.app}>
              <SideBar
              components={components}
              activePage={page[0]}
              changePage={changePage} />
              <Main page={page} />
          </div>
          {popup == false ? null : <Popup  />}
          </Fragment>
        </CommentContext.Provider>
      </PopupContext.Provider>
  )
}

export default App;

export const PopupContext = createContext();
export const CommentContext = createContext();
