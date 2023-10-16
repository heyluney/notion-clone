import { useState, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedEmojiDictionary } from './data/populate_emoji_dictionary';
import { seedPages } from './data/populate_pages'

import { getItem, saveItem } from './utils/local_storage';
import Overlay from './Overlay';

import url_map from './utils/url_to_component_map';


const App = () => {
  const location = useLocation();
  saveItem('current_page_name', url_map[location.pathname]);
  
  seedEmojiDictionary();
  seedPages();

  const [pages, changePages] = useState(getItem('pages'));
  const [currentPageName, changeCurrentPageName]
    = useState(getItem('current_page_name'));

  // If user presses back and forth buttons, want to update currentPageName
  // to be in sync with the actual page being displayed.
  if (currentPageName !== url_map[location.pathname]) {
    changeCurrentPageName( url_map[location.pathname])
    saveItem('current_page_name', currentPageName);
  }

  // Determines global state for whether a popup is currently open or not.
  const [popup, togglePopup] = useState(null);
  addFaviconToPage(pages[currentPageName].icon);

  // Controls the journal entry that will be displayed on SlideOut component. The reason why physicalSlideOut exists is because the text on the slideOut needs to exist until the transition time is completely over.
  const [slideOut, toggleSlideOut] = useState(null);
  const [physicalSlideOut, togglePhysicalSlideOut] = useState(false);

  const [slideOutTransitionTime, changeSlideOutTransitionTime] = useState(300);
  return (
    <PageContext.Provider value={{
      currentPageName, changeCurrentPageName,
      pages, changePages
    }}>
      <PopupContext.Provider value={{ popup, togglePopup }}>
        <SlideOutContext.Provider value={{
          slideOut, toggleSlideOut,
          physicalSlideOut, togglePhysicalSlideOut,
          slideOutTransitionTime, changeSlideOutTransitionTime
        }}>
          <Fragment>
            <div className={`${styles.app}`}>
              <SideBar />
              <Main />
            </div>
            {popup && <Overlay />}
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



