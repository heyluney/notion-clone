import { useState, useEffect, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

// import { addFaviconToPage } from './utils/generate_favicon';
import { retrieveLatestKey } from './data/database/database_functions';
import { component_map } from './data/database/component_map';
import { seedPages } from './data/database/seeded_data'
import { getFromLocalStorage, saveToLocalStorage, getChildComponents } from './data/database/database_functions';

const App = () => {
  seedPages();
  const location = useLocation();

  const [components, changeComponents] = useState(getFromLocalStorage('components'));
  const [activeComponents, changeActiveComponents] = useState({
    "page": 
      parseInt(location.pathname.slice(location.pathname.lastIndexOf('/')+1)),
    "last_id": 15
  });

  useEffect(() => {
    const lastKey = retrieveLatestKey(components);

    // console.log('components', components)

    // Detects when a new page is added and updates the url to display that page.
    if (activeComponents.last_id !== lastKey && 
        components[lastKey].component_type == component_map['page']) {

        changeActiveComponents({
          ...activeComponents,
          ...{
            "page": lastKey,
            "last_id": lastKey}
        })
        window.history.replaceState(null, "", `${lastKey}`);
      }

  }, [components])

  useEffect(() => saveToLocalStorage('components', components), [components]);
  useEffect(() => {
    // console.log('activeComponents', activeComponents)
    saveToLocalStorage('activeComponents', activeComponents)}, [activeComponents])


  // addFaviconToPage(getChildComponents(components, activeComponents[component_type['page']], "emoji"));
  
  return (
    <PageContext.Provider value={{
      components, changeComponents,
      activeComponents, changeActiveComponents,
    }}>
      <div className={`${styles.app}`}>
        <SideBar />
        <Main />
      </div>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
