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

  addFaviconToPage(pages[currentPageName].icon);

  // Represents the current item being modified. Type and id are sufficient to be 
  // a unique identifier (e.g. for the emoji selector popup).
  const [component, changeComponent] = useState({
    id: null,
    type: null,
    popups: {
      modal: false,
      emoji: false,
      slideout: false
    } // Multiple popups (e.g. slideout, emoji, modal) can be triggered simultaneously.
  })
  return (
    <PageContext.Provider value={{
      currentPageName, changeCurrentPageName,
      pages, changePages,
      component, changeComponent
    }}>
        <Fragment>
          <div className={`${styles.app}`}>
            <SideBar />
            <Main />
          </div>
          <Overlay />
        </Fragment>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
export const PopupContext = createContext();



