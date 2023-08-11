import { useState } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

import { LuClock9 as Clock, 
  LuImport as Import } from 'react-icons/lu';
import { FaSearch as Search, 
  FaPlusCircle as Plus,
  FaShapes as Shapes } from 'react-icons/fa';
import { BsGearFill as Gear, 
  BsFileEarmark as Earmark, 
  BsScissors as Scissors,
  BsBookFill as Book,
  BsBookHalf as Book2,
  BsPlus as Plus2,
  BsFillPeopleFill as People,
BsTrash2Fill as Trash } from 'react-icons/bs';

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
  return (
    <div className={styles.app}>
          <SideBar 
            components={components} 
            changePage={changePage}/>
          <Main page={page}/>
     </div>
  )
}

export default App;
