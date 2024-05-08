import { useState, useEffect, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedEmojiDictionary, populateEmojiDictionary } from './data/populate_emoji_dictionary';
import { seedPages } from './data/populate_pages'

import { getItem, saveItem } from './utils/local_storage';
import EmojiOverlay from './components/overlays/EmojiOverlay';
// import ModalOverlay from './components/overlays/ModalOverlay';
// import Modal from './components/popups/Modal';
// import Overlay from './Overlay';

import SlideOut from './components/popups/SlideOut';


import { findEmoji, findComments } from './data/pages_helper_functions';

const App = () => {
  // localStorage.clear();
  seedPages();
  const location = useLocation();

  saveItem('current_page_id', 
    parseInt(location.pathname.slice(location.pathname.lastIndexOf('/')+1))
  )

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
  const [currentPageId, changeCurrentPageId] = useState(getItem('current_page_id'));
  const [emojis, changeEmojis] =  useState(getItem('emojis'));
  const [comments, changeComments] = useState(getItem('comments'));
  const [categories, changeCategories] = useState(getItem('categories'));
  const [todos, changeTodos] = useState(getItem('todos'));
  const [journal, changeJournal] = useState(getItem('journal'));
  const [tags, changeTags] = useState(getItem('tags'));
  const [activeEntityId, changeActiveEntityId] = useState(-1);


  // Update local storage whenever state changes.
  useEffect(() => saveItem('pages', pages), [pages]);
  useEffect(() => saveItem('current_page_id', currentPageId), [currentPageId]);
  useEffect(() => saveItem('emojis', emojis), [emojis]);
  useEffect(() => saveItem('comments', comments), [comments]);
  useEffect(() => saveItem('categories', categories), [categories]);
  useEffect(() => saveItem('todos', todos), [todos]);
  useEffect(() => saveItem('journal', journal), [journal]);
  useEffect(() => saveItem('tags', tags), [tags]);


  const pageEmoji = findEmoji(emojis, 'page', currentPageId);
  const pageComments = findComments(comments, 'page', currentPageId);

  addFaviconToPage(pageEmoji);

  const [slideOutWidth, changeSlideOutWidth] = useState(500);

  return (
    <PageContext.Provider value={{
      pages, changePages,
      currentPageId, changeCurrentPageId,
      emojis, changeEmojis,
      pageEmoji, 
      comments, changeComments,
      categories, changeCategories,
      todos, changeTodos,
      journal, changeJournal,
      tags, changeTags,
      activeEntityId, changeActiveEntityId,
      slideOutWidth, changeSlideOutWidth
    }}>
      <div className={`${styles.app}`}>
        <SideBar />
        <Main emoji={pageEmoji} 
            comments={pageComments}/>
        <SlideOut />
      </div>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();
// export const PopupContext = createContext();



