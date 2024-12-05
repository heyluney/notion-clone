import { useState, useEffect, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/static/sidebar/SideBar';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedPages } from './data/database/seeded_data'
import { getFromLocalStorage, saveToLocalStorage } from './data/database/database_functions';

import ErrorPage from './pages/Error/ErrorPage';
import HomePage from './pages/Home/HomePage';

import Page from './components/Page';

const App = () => {
  seedPages();
  console.log('am here')
  const location = useLocation();

  const [components, changeComponents] = useState(getFromLocalStorage('components'));

  // Only one React component of a type can be active at a given time.
  const [activeComponents, changeActiveComponents] = useState({});

  useEffect(() => {
    saveToLocalStorage('components', components)
  }, [components]);
  useEffect(() => {
    saveToLocalStorage('activeComponents', activeComponents)
  }, [activeComponents]);

  const currentPageId = parseInt(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
  console.log('currentPageId', currentPageId)

  addFaviconToPage(currentPageId && components[currentPageId] ? components[currentPageId].emoji :  "1F9D7 1F3FB 200D 2640 FE0F");

  const page_ids = components[0].children;

  console.log("This is react router path: ", location.pathname)
  return (
    <PageContext.Provider value={{
      components, changeComponents,
      activeComponents, changeActiveComponents,
    }}>
      <div className={styles.app}>
        <SideBar page_ids={page_ids} />
        <div className={styles.main}>
          <Routes>
            {page_ids.map(id => {
              return <Route
              key={id}
              path={`/notion-clone/${id}`}
              element={<Page page={components[id]} />} />
            })}

            <Route exact path="/notion-clone/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
