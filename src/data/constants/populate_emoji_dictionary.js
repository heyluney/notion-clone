
import { getItem, saveItem } from '../../data/database/database_functions';
const myMarkdownFile = require("./emojis.txt");

export const cleanDict = data => {
    const dictionary = {};
    const lines = data.split('\n').filter(x => x !== '');
    let currentGroupName = "";
    let currentSubgroupName = "";
    for (let line of lines) {
        if (line.includes('total') || line.includes('subtotal')) continue;
        if (line.startsWith('#')) {
            const name = line.split(':')[1].trim();

            if (!line.includes('subgroup')) {
                dictionary[name] = {};
                if (currentGroupName !== name) currentGroupName = name;
            } else {
                dictionary[currentGroupName][name] = {};
                if (currentSubgroupName !== name) currentSubgroupName = name;
            }
        } else {
            if (line.includes('unqualified')) continue;
            if (line.includes('minimally-qualified')) continue;

            const hexcode = line.split(';')[0].trim();

            // Edge case is if the emoji itself is a '#'.
            const rest = hexcode === "0023 FE0F 20E3" ? line.split('#')[2] : line.split('#')[1];
            const weird_code = rest.match(/E[0-9]*\.[0-9]*/);
            const desc = rest.split(weird_code)[1].trim();
          
            // A couple of emojis do not look visually in keeping with the rest, omit this from the final emoji dictionary.
            if (desc === "smiling face") continue;
            if (desc === "dotted line face") continue;
            if (desc === "frowning face") continue;

            dictionary[currentGroupName][currentSubgroupName][desc] = hexcode;
        }
    }

    dictionary.recent = {};
    dictionary.skintone = "none";
    return dictionary;
}

// fetch is async?

// populateEmojiDictionary is async 
export const populateEmojiDictionary = () => {
    return fetch(myMarkdownFile)
        .then(response => response.text())
        .then(text => cleanDict(text))
}

// export const seedEmojiDictionary = () => {
//     if (getItem('emoji_dictionary') === null) populateEmojiDictionary();
//     if (getItem('emoji_dictionary_skintone') === null) {saveItem('emoji_dictionary_skintone', 'none');}
// }

export const skintones = ["none", 
    "light skin tone",
    "medium-light skin tone", 
    "medium skin tone",
    "medium-dark skin tone",
    "dark skin tone"
];
