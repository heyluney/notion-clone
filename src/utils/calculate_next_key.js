// Helper method for getting all keys sorted in descending order.
const retrieveKeysInDescendingOrder = hash => {
    return Object.keys(hash).map(x => parseInt(x)).sort((a,b) => b-a);
}

export const calculateNextKey = hash => {
    const descKeys = retrieveKeysInDescendingOrder(hash);
    return descKeys.length === 0 ? 1 : descKeys[0] + 1;
}

export const shiftAllKeys = (hash, shiftId) => {
    const descKeys = retrieveKeysInDescendingOrder(hash);
    for (let key of descKeys) {
        if (key >= shiftId) {
            hash[key+1] = hash[key];
        }
    }
}
