import { useState, useEffect, createContext, useCallback } from 'react';
import styles from './App.module.css';
import SideBar from './components/static/sidebar/SideBar';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import useLocalStorage from './hooks/useLocalStorage';

import ErrorPage from './pages/Error/ErrorPage';
import HomePage from './pages/Home/HomePage';

import Page from './components/Page';

// state has components 
const App = () => {  
  const [components, changeComponents] = useLocalStorage();

  return (
    <PageContext.Provider value={{
      components, 
      changeComponents
      }}>
      <div className={styles.app}>
        <SideBar page_ids={components[0].children} />
        <div className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            { components[0].children.map(id => {
              return <Route
              key={id}
              path={`/${id}`}
              element={<Page page={components[id]} />} />
            })}

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </PageContext.Provider>
  )
}

export const PageContext = createContext();

export default App;

