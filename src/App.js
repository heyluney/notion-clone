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

// Component, Icon, isDetailItem
const App = () => {
  const pages = {
    "Quick Note": ["Quick Note", "/quick_note", Earmark, QuickNote],
    "Task List": ["Task List", "/task_list", Scissors, TaskList],
  };
  const [currentPage, changePage] = useState(pages["Task List"]);

  if (localStorage.getItem('quicknote-comments') == null)
    localStorage.setItem('quicknote-comments', JSON.stringify({}));

  const [comments, changeComments] = useState(
      JSON.parse(localStorage.getItem('quicknote-comments'))
  );
  return (
      <CommentContext.Provider value={{comments, changeComments}}>
          <Fragment>
          <div className={styles.app}>
              <SideBar
              pages={pages}
              currentPage={currentPage}
              changePage={changePage} />

              <Main 
              pages={pages}
              currentPage={currentPage} 
              />
          </div>
          </Fragment>
        </CommentContext.Provider>
  )
}

export default App;

export const CommentContext = createContext();



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