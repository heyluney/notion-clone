import { useState, useEffect, createContext } from 'react';
import styles from './App.module.css';
import SideBar from './components/sidebar/SideBar';
import Main from './components/main/Main';
import { useLocation } from 'react-router-dom';

import { addFaviconToPage } from './utils/generate_favicon';
import { seedPages } from './data/populate_pages'

import { getItem, saveItem } from './utils/local_storage';

import SlideOut from './components/popups/SlideOut';

import { componentMap } from './data/component_map';
import { findEmoji, findComments } from './data/pages_helper_functions';

const App = () => {
  localStorage.clear();
  seedPages();
  const location = useLocation();

  saveItem('current_page_id', 
    parseInt(location.pathname.slice(location.pathname.lastIndexOf('/')+1))
  )

  const [state, changeState] = useState(getItem('state'));

  const [currentPageId, changeCurrentPageId] = useState(getItem('current_page_id'));
  useEffect(() => saveItem('state', state), [state]);

  const [pages, changePages] = useState(state[componentMap['pages']]);
  const [comments, changeComments] = useState(state[componentMap['comments']]);
  const [emojis, changeEmojis] =  useState(state[componentMap['emojis']]);
  const [tags, changeTags] = useState(state[componentMap['tags']]);

  const [components, changeComponents] = useState(state[componentMap['components']]);
  const [subComponents, changeSubComponents] = useState(state[componentMap['sub_components']]);

  // slideOut
  // const [activeEntity, changeActiveEntity] = useState(null);

  // I wonder if emojis, tags, etc. can be subcomponents?
  addFaviconToPage(findEmoji(emojis, 'pages', currentPageId));

  const [slideOutWidth, changeSlideOutWidth] = useState(0);
  return (
    <PageContext.Provider value={{
      pages, changePages,
      currentPageId, changeCurrentPageId,
      emojis, changeEmojis,
      comments, changeComments,
      tags, changeTags,
      components, changeComponents,
      subComponents, changeSubComponents,
      slideOutWidth, changeSlideOutWidth
    }}>
      <div className={`${styles.app}`}>
        <SideBar />
        <Main />
        <SlideOut />
      </div>
    </PageContext.Provider>
  )
}

export default App;

export const PageContext = createContext();



  // const [emojiDictionary, changeEmojiDictionary] = useState(null);
  // useEffect(() => { 
  //   const asyncPopulateEmojiDictionary = async() => {
  //     const dictionary = await populateEmojiDictionary();
  //     changeEmojiDictionary(dictionary);
  //   }
  //   asyncPopulateEmojiDictionary();
  // }, [])

  // useEffect(() => { 
  //   saveItem('emoji_dictionary', emojiDictionary);
  // }, [emojiDictionary]);