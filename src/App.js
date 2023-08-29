import { useState, useEffect, useRef, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

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

import QuickNote from './pages/QuickNote/QuickNote';
import TaskList from './pages/TaskList/TaskList';

const App = () => {
  // used to be Earmark, Scissors
  const allPages = {
    "Quick Note": ["Quick Note", "/quick_note", '0x1F9A1', QuickNote],
    "Task List": ["Task List", "/task_list", '0x1F32D', TaskList],
  };
  // all pages and the currentPage (represented by key) are encapsulated
  const [pages, changePages] = useState([allPages, "Task List"]);

  if (localStorage.getItem('quicknote-comments') == null)
    localStorage.setItem('quicknote-comments', JSON.stringify({}));

  const [comments, changeComments] = useState(
      JSON.parse(localStorage.getItem('quicknote-comments'))
  );
  return (
    <PageContext.Provider value={{pages, changePages}}>
      <CommentContext.Provider value={{comments, changeComments}}>
          <Fragment>
          <div className={styles.app}>
              <SideBar
              pages={pages} />

              <Main 
              pages={pages} />
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