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

import { url_map } from './utils/maps';


// currently pages is de-normalized 
// tables => comments 


// Page
// id (unique int)
// title (string)
// created_at


// Emoji (not unique to one page)
// id (unique int)
// entity_type  (e.g.a num that maps to page, comment, title) (foreign key)
// entity_id 

// Comments
// id (unique int)
// text (string)
// entity_type (e.g. page, comment, title)
// created_at 

// Journal
// id (unique int)
// title 
// created_at

// Tags
// id (unique int)
// entity_type
// entity_id 



const App = () => {
  localStorage.clear();
  seedPages();
  const location = useLocation();

  saveItem('current_page_id', location.pathname.slice(location.pathname.lastIndexOf('/')+ 1))    

  const [emojiDictionary, changeEmojiDictionary] = useState(null);
  useEffect(() => { 
    const asyncPopulateEmojiDictionary = async() => {
      const dictionary = await populateEmojiDictionary();
      changeEmojiDictionary(dictionary);
    }
    asyncPopulateEmojiDictionary();
  }, [])

  useEffect(() => { 
    saveItem('emoji_dictionary', emojiDictionary);
  }, [emojiDictionary]);

  const [pages, changePages] = useState(getItem('pages'));
  const [currentPageId, changeCurrentPageId] = useState(parseInt(getItem('current_page_id')));
  const [emojis, changeEmojis] =  useState(getItem('emojis'));
  const [comments, changeComments] = useState(getItem('comments'));

  useEffect(() => saveItem('pages', pages), [pages]);
  useEffect(() => saveItem('current_page_id', parseInt(currentPageId)), [currentPageId]);
  useEffect(() => saveItem('emojis', emojis), [emojis]);
  useEffect(() => saveItem('comments'), [comments]);
  // console.log('pages', pages)

  // addFaviconToPage(pages[1].icon);

  // Represents the current item being modified. Type and id are sufficient to be a unique identifier (e.g. for the emoji selector popup).
  // const [component, changeComponent] = useState({
  //   id: null,
  //   type: null,
  //   popups: {
  //     modal: false,
  //     emoji: false,
  //     slideout: false
  //   } // Multiple popups (e.g. slideout, emoji, modal) can be triggered simultaneously.
  // })
  return (
    <PageContext.Provider value={{
      pages, changePages,
      currentPageId, changeCurrentPageId,
      emojis, changeEmojis,
      comments, changeComments
    }}>
        <Fragment>
          <div className={`${styles.app}`}>
            {/* <SideBar /> */}
            <Main />
          </div>
          
          {/* <Modal /> */}
          {/* <EmojiOverlay/> */}
          {/* <ModalOverlay/> */}
        </Fragment>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
export const PopupContext = createContext();



