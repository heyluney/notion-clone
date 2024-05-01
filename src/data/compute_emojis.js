export const computeEmoji = hexcode => {
    const codes = hexcode.split(' ').map(code => "0x" + code);
    return String.fromCodePoint(...codes);
}

export const getSkinToneEmoji = (emojiDict, skintone) => {
    const newSkinTone = emojiDict['People & Body']
    ['hand-fingers-open']
    [`raised hand${skintone === "none" ? "" : ": " + skintone}`];
    return newSkinTone;
}

export const getTotalEmojiCount = emojiDict => {
    let count = 0;
    for (let category in emojiDict) {
        for (let subcategory in emojiDict[category]) {
            count += Object.entries(emojiDict[category][subcategory]).length;
        }
    }
    return count;
}

export const getReverseDictionary = emojiDict => {
    const reverseDict = {};
    let count = 0;
    for (let category in emojiDict) {
        for (let subcategory in emojiDict[category]) {
            for (let name in emojiDict[category][subcategory]) {
                reverseDict[count] = {
                    description: name,
                    hexcode: emojiDict[category][subcategory][name]
                };
                count++;
            }
        }
    }
    return reverseDict;
}

export const getRandomEmoji = emojiDict => {
    const reverseDict = getReverseDictionary(emojiDict);
    const totalEmojiCount = getTotalEmojiCount(emojiDict);
    const random = Math.floor(Math.random()*totalEmojiCount);
    return reverseDict[random];
}

export const getSkinToneCategories = emojiDictPeople => {
    const newEmojiDictPeople = {
        'none': {},
        'light skin tone': {},
        'medium-light skin tone': {},
        'medium skin tone': {},
        'medium-dark skin tone': {},
        'dark skin tone': {}
    };
    for (let subcategory in emojiDictPeople) {
        for (let name in emojiDictPeople[subcategory]) {
            if (name.includes('medium-light')) {
                if (newEmojiDictPeople['medium-light skin tone'][subcategory] === undefined) {
                    newEmojiDictPeople['medium-light skin tone'][subcategory] = {};
                }
                newEmojiDictPeople['medium-light skin tone']
                    [name] = emojiDictPeople[subcategory][name];
            } else if (name.includes('medium ')) {
                if (newEmojiDictPeople['medium skin tone'][subcategory] === undefined) {
                    newEmojiDictPeople['medium skin tone'][subcategory] = {};
                }
                newEmojiDictPeople['medium skin tone'][subcategory][name] = emojiDictPeople[subcategory][name];
            } else if (name.includes('medium-dark')) {
                if (newEmojiDictPeople['medium-dark skin tone'][subcategory] === undefined) {
                    newEmojiDictPeople['medium-dark skin tone'][subcategory] = {};
                }
                newEmojiDictPeople['medium-dark skin tone'][subcategory][name] = emojiDictPeople[subcategory][name];
            } else if (name.includes('light ')) {
                if (newEmojiDictPeople['light skin tone'][subcategory] === undefined) {
                    newEmojiDictPeople['light skin tone'][subcategory] = {};
                }
                newEmojiDictPeople['light skin tone'][subcategory][name] = emojiDictPeople[subcategory][name];
            } else if (name.includes('dark ')) {
                if (newEmojiDictPeople['dark skin tone'][subcategory] === undefined) {
                    newEmojiDictPeople['dark skin tone'][subcategory] = {};
                }
                newEmojiDictPeople['dark skin tone'][subcategory][name] = emojiDictPeople[subcategory][name];
            } else {
                if (newEmojiDictPeople['none'][subcategory] === undefined) {
                    newEmojiDictPeople['none'][subcategory] = {};
                }
                newEmojiDictPeople['none'][subcategory][name] = emojiDictPeople[subcategory][name];
            }
        }
    }
    return newEmojiDictPeople;
}

export const getRepresentativeEmojis = emojiDict => {
    return Object.entries(emojiDict)
                .filter(([category, _]) => category !== 'recent')
                .map(([category, subCategoryHash]) => [
                        category,
                        Object.entries(subCategoryHash)
                            .map(([_, hexCodePairs]) => Object.entries(hexCodePairs)).flat()[0][1]]);
}

export const filterEmojiDictionaryBySkintone = (emojiDict, skintone) => {
    const newEmojiDict = {};

    for (let category in emojiDict) {
        if (category === 'People & Body') {
            newEmojiDict['People & Body'] = 
            getSkinToneCategories(emojiDict['People & Body'])[skintone];
        } else {
            newEmojiDict[category] = emojiDict[category];
        }
    }

    return newEmojiDict;
}
export const filterEmojiDictionary = (emojiDict, prefix) => {
    // console.log('emojiDict filter', emojiDict);
    const newEmojiDict = {};
    for (let category in emojiDict) {
        if (category === 'recent') continue;
        for (let subcategory in emojiDict[category]) {
            for (let name in emojiDict[category][subcategory]) {
                if (newEmojiDict[category] === undefined) newEmojiDict[category] = {};
                if (newEmojiDict[category][subcategory] === undefined) newEmojiDict[category][subcategory] = {};
    
                if (name.includes(prefix)) {
                    newEmojiDict[category][subcategory][name] =
                    emojiDict[category][subcategory][name];
                }
            }
        }
    }
    newEmojiDict['recent'] = emojiDict['recent'];
    // console.log('newEmojiDict filter', newEmojiDict)
    return newEmojiDict;
}

export const flattenEmojiDictionary = emojiDict => {
    if (emojiDict === null) return {};
    console.log('emojiDict', emojiDict);
    const flattened = Object.fromEntries(
        Object.entries(emojiDict)
                .filter(([category, _]) => category !== 'recent')
                .map(([category, subCategoryHash]) => [
                        category,
                        Object.entries(subCategoryHash)
                            .map(([_, hexCodePairs]) => Object.entries(hexCodePairs)).flat().map(x => [x[0], x[1], true])
        ])
    );
    // console.log('flattened', flattened);
    flattened['recent'] = Object.entries(emojiDict['recent']).map(x => [x[0], x[1], true]);
    return flattened;
}

export const truncateEmojiDictionary = (emojiDict, prefix, length) => {
    let count = 0;
    const newEmojiDict = {};
    
    if (prefix !== "") {
        // Only includes entries where the emoji "name" includes prefix.
        for (let category in emojiDict) {
            newEmojiDict[category] = 
                emojiDict[category]
                    .map(([name, hexcode, isVisible]) => name.includes(prefix) ? 
                        [name, hexcode, true] : [name, hexcode, false])
        }
    } else {
        // Number of emoji entries is at most length.
        for (let category in emojiDict) {
            const temp = [];

            for (let i = 0; i < emojiDict[category].length; i++) {
                const name = emojiDict[category][i][0];
                const hexcode = emojiDict[category][i][1];
                if (count + i + 1 < length) {
                    temp.push([name, hexcode, true]);
                } else {
                    temp.push([name, hexcode, false]);
                }
            }
            newEmojiDict[category] = temp;
            // newEmojiDict[category] = emojiDict[category].map(
            //     ([name, hexcode, isVisible], idx) => count + emojiDict[category].length > length 
            //         ? [name, hexcode, false] 
            //         : [name, hexcode, true]
            // );
            count += emojiDict[category].length;
        }
    }
    newEmojiDict['recent'] = emojiDict['recent'];
    return newEmojiDict;
}

export const addEmojiToRecent = (emojiDict, newEmojiPair) => {
    return {
        ...emojiDict,
        "recent": {
            ...emojiDict["recent"],
            ...newEmojiPair
        }
    }
}