import { useState } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

// app needs to have state of which thing is being pressed, sidebar doesn't change 
const App = () => {
  const [page, changePage] = useState("search");
  return (
    <div className={styles.app}>
          <SideBar changePage={changePage}/>
          <Main page={page}/>
     </div>
  )
}

export default App;
