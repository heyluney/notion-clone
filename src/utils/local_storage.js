// This file will have all the methods to save and retrieve from local storage
export const saveItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
}