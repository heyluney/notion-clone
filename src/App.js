import { useState, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedEmojiDictionary } from './data/populate_emoji_dictionary';
import { seedPages } from './data/populate_pages'

import { getItem } from './utils/local_storage';
import Overlay from './Overlay';

const App = () => {
  seedEmojiDictionary();
  seedPages();
  const [pages, changePages] = useState(getItem('pages'));
  const [currentPageName, changeCurrentPageName]
    = useState(getItem('current_page_name'));

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