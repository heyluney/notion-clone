

import { saveItem, getItem } from '../utils/local_storage';

import { defaultPages } from './databases/pages';
import { defaultComments } from './databases/comments';
import { defaultEmojis } from './databases/emojis';
import { defaultTags } from './databases/tags';

import { defaultComponents } from './databases/components';
import { defaultSubComponents } from './databases/sub_components';

// import { pastelColors } from './color_constants';

// This seeds some data across various pages using local storage (so data
// persists between clearing local storage).

// TODO(helen): Double check that icons also work to substitute traditional emojis.

const defaultState = {
  1: defaultPages,
  2: defaultComments,
  3: defaultEmojis,
  4: defaultTags,
  5: defaultComponents,
  6: defaultSubComponents
}

export const seedPages = () => {
  if (getItem('state') === null) saveItem('state', defaultState);
}
