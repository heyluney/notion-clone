export const computeEmoji = hexcode => {
    const codes = hexcode.split(' ').map(code => "0x" + code);
    return String.fromCodePoint(...codes);
}

// Object.entries(emojiDict)
// .filter(([category, _]) => category != 'recent')
// .map(([category, subCategoryHash]) => [
//         category,
//         Object.entries(subCategoryHash)
//             .map(([_, hexCodePairs]) => Object.entries(hexCodePairs)).flat().map(x => [x[0], x[1], true])
// ])
export const getRepresentativeEmojis = emojiDict => {
    return Object.entries(emojiDict)
                .filter(([category, _]) => category != 'recent')
                .map(([category, subCategoryHash]) => [
                        category,
                        Object.entries(subCategoryHash)
                            .map(([_, hexCodePairs]) => Object.entries(hexCodePairs)).flat()[0][1]]);
}

export const filterEmojiDictionary = (emojiDict, prefix) => {
    if (prefix === "") return emojiDict;

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
    return newEmojiDict;
}

export const flattenEmojiDictionary = emojiDict => {
    const flattened = Object.fromEntries(
        Object.entries(emojiDict)
                .filter(([category, _]) => category != 'recent')
                .map(([category, subCategoryHash]) => [
                        category,
                        Object.entries(subCategoryHash)
                            .map(([_, hexCodePairs]) => Object.entries(hexCodePairs)).flat().map(x => [x[0], x[1], true])
        ])
    );
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
            newEmojiDict[category] = emojiDict[category].map(
                ([name, hexcode, isVisible], idx) => count + idx > length ? [name, hexcode, false] : [name, hexcode, true]
            );
            count += emojiDict[category].length;
        }
    }
    newEmojiDict['recent'] = emojiDict['recent'];
    return newEmojiDict;
}