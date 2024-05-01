import { useState, useEffect, Fragment, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedEmojiDictionary, populateEmojiDictionary } from './data/populate_emoji_dictionary';
import { seedPages } from './data/populate_pages'

import { getItem, saveItem } from './utils/local_storage';
import EmojiOverlay from './components/overlays/EmojiOverlay';
import ModalOverlay from './components/overlays/ModalOverlay';
import Modal from './components/popups/Modal';
// import Overlay from './Overlay';

import url_map from './utils/url_to_component_map';


const App = () => {
  localStorage.clear();

  const location = useLocation();
  saveItem('current_page_name', url_map[location.pathname]);
  
  seedPages();
  
  // before seedDictionary is run, 
  const [emojiDictionary, changeEmojiDictionary] = useState();

  // seedEmojiDictionary();

  useEffect(() => { 
    populateEmojiDictionary();
    changeEmojiDictionary(getItem('emoji_dictionary'));
    console.log('emojiDictionary', emojiDictionary)

  }, [])

  const [pages, changePages] = useState(getItem('pages'));
  const [currentPageName, changeCurrentPageName]
    = useState(getItem('current_page_name'));


  // If user presses back and forth buttons, want to update currentPageName to be in sync with the actual page being displayed.
  if (currentPageName !== url_map[location.pathname]) {
    changeCurrentPageName( url_map[location.pathname])
    saveItem('current_page_name', currentPageName);
  }

  addFaviconToPage(pages[currentPageName].icon);

  // Represents the current item being modified. Type and id are sufficient to be a unique identifier (e.g. for the emoji selector popup).
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
      component, changeComponent,
      emojiDictionary, changeEmojiDictionary
    }}>
        <Fragment>
          <div className={`${styles.app}`}>
            <SideBar />
            <Main />
          </div>
          
          <Modal />
          {/* <EmojiOverlay/> */}
          <ModalOverlay/>
        </Fragment>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
export const PopupContext = createContext();



