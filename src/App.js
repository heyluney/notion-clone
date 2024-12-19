import { createContext, useState } from 'react';
import styles from './App.module.css';
import colors from './colors.module.css';

import SideBar from './components/static/sidebar/SideBar';
import { Routes, Route } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';
import useClickable from './hooks/useClickable';

import ErrorPage from './pages/Error/ErrorPage';
import HomePage from './pages/Home/HomePage';

import Page from './components/Page';
import Overlay from './components/static/overlays/Overlay'

const App = () => {
  const [
    components, changeComponents,
    globalStyles, changeGlobalStyles
  ] = useLocalStorage();

  // clickState stores the unique id of the component that was clicked. This ensures that only one dependency (e.g. popup) is rendered, despite there being multiple components that can trigger an event listener.
  const [clickState, changeClickState] = useClickable();
  const [pageId, changePageId] = useState(window.location.hash.substring(2));

  // const currentPageId = parseInt();
  // console.log('currentPageId', currentPageId)
  const { nightMode } = globalStyles;
  const { app, main } = styles;
  const { day_scheme, night_scheme } = colors;
  return (
    <PageContext.Provider value={{
      pageId, changePageId,
      components, changeComponents,
      globalStyles, changeGlobalStyles,
      clickState, changeClickState,
    }}>
      <div className={`${app} ${nightMode ? night_scheme : day_scheme}`}>
        <Overlay visible={clickState} />
        <SideBar page_ids={components[0].children} />
        <div className={main}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {components[0].children.map(id => {
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

