import { useState, useEffect, createContext, useCallback } from 'react';
import styles from './App.module.css';
import SideBar from './components/static/sidebar/SideBar';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import useLocalStorage from './hooks/useLocalStorage';
import useClickable from './hooks/useClickable';
import useHoverable from './hooks/useHoverable'

import ErrorPage from './pages/Error/ErrorPage';
import HomePage from './pages/Home/HomePage';

import Page from './components/Page';
import Overlay from './components/static/overlays/Overlay'

const App = () => { 
  const [components, changeComponents] = useLocalStorage();
  const [clickState, changeClickState] = useClickable();
  const [hoverState, updateHoverState] = useHoverable();

  return (
    <PageContext.Provider value={{
      components, changeComponents,
      clickState, changeClickState,
      hoverState, updateHoverState
      }}>
      <div className={styles.app}>
        <Overlay visible={clickState}/>
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

