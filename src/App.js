import { useState, Fragment, createContext, useEffect } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

import { saveItem } from './utils/local_storage';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedEmojiDictionary } from './data/populate_emoji_dictionary';
import { seedPages } from './data/populate_pages'

import { getItem } from './utils/local_storage';
import Overlay from './Overlay';

import url_map from './utils/url_to_component_map';


const App = () => {
  // This allows us to dynamically pull up current page as the page associated with
  // the relevant url as default behavior.
  const location = useLocation();
  saveItem('current_page_name', url_map[location.pathname]);

  useEffect(() => {
    changeCurrentPageName(url_map[location.pathname]);
    saveItem('current_page_name', currentPageName);
    addFaviconToPage(pages[currentPageName].icon);
  }, [location])

  seedEmojiDictionary();
  seedPages();
  const [pages, changePages] = useState(getItem('pages'));
  const [currentPageName, changeCurrentPageName]
    = useState(getItem('current_page_name'));

    console.log('pages', pages);
    console.log('currentPageName', currentPageName);
  // Determines global state for whether a popup is currently open or not.
  const [popup, togglePopup] = useState(null);
  addFaviconToPage(pages[currentPageName].icon);
  const [slideOut, toggleSlideOut] = useState(null);

  return (
    <PageContext.Provider value={{
      currentPageName, changeCurrentPageName,
      pages, changePages
    }}>
      <PopupContext.Provider value={{ popup, togglePopup }}>
        <SlideOutContext.Provider value={{ slideOut, toggleSlideOut }}>
          <Fragment>
            <div className={`${styles.app}`}>
              <SideBar />
              <Main />
            </div>            
            {popup && <Overlay/>}
          </Fragment>
        </SlideOutContext.Provider>
      </PopupContext.Provider>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
export const PopupContext = createContext();
export const SlideOutContext = createContext();