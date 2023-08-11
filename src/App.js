import { useState } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

// the hash map of 
const App = () => {
  // the hash map of items is going to be here 
  const [page, changePage] = useState("search");
  return (
    <div className={styles.app}>
          <SideBar changePage={changePage}/>
          <Main page={page}/>
     </div>
  )
}

export default App;
