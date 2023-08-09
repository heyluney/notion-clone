import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

function App() {
  return (
    <div className={styles.app}>
          <SideBar/>
          <Main/>
     </div>
  );
}

export default App;
