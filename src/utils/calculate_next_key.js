export const calculateNextKey = hash => {
    const keysSortedDescending 
        = Object.keys(hash).sort((a,b) => b-a).map(x => parseInt(x));
    return keysSortedDescending.length === 0 ? 1 : keysSortedDescending[0] + 1;
}

