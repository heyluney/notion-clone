import { calculateNextKey } from "../utils/calculate_next_key";
// Note: All functions are pure functions - create a copy of the original 
// state before modifying.

// All of these functions are page-level -> they return the entire "pages" object,
// which can be subsequently saved in local storage.


export const updateTitleEmoji = (pages, pageName, hexcode) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: {...page, icon: hexcode}
    }
}
export const editTitle = (pages, pageName, newTitle) => {
    const {[pageName]: pageToDelete, ...restOfPages} = pages; 
    return {
        ...restOfPages,
        [newTitle]: {
            ...pageToDelete,
            name: newTitle
        }
    }
}

export const addComment = (pages, pageName, commentText) => {
    const page = pages[pageName];
    return {
        ...pages, 
            [pageName]: {
                ...page, 
                comments: {
                    ...page.comments,
                    [calculateNextKey(page.comments)]: {
                        timestamp: JSON.stringify(new Date()),
                        comment: commentText,
                        edited: false,
                        emojis: {}
                    }
                }
            }
    }
}
export const editComment = (pages, pageName, commentText, commentIdx) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: {
            ...page,
            comments: {
                ...page.comments,
                [commentIdx]: {
                    ...page.comments[commentIdx],
                    timestamp: JSON.stringify(new Date()),
                    comment: commentText,
                    edited: true
                }
            }
        }
    }
}
export const addEmojiToComment = (pages, pageName, commentIdx, emojiPair) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: { 
            ...page,
            comments: {
                ...page.comments,
                [commentIdx]: {
                    ...page.comments[commentIdx],
                    emojis: {
                        ...page.comments[commentIdx].emojis, 
                        ...emojiPair
                    }
                }
            }
        }
    }
}

export const removeEmojiFromComment = (pages, pageName, commentIdx, emoji) => {
    const page = pages[pageName];
    const {[emoji]: desc, ...keptEmojis} = page.comments[commentIdx].emojis;
    return {
        ...pages, 
        [pageName]: {
            ...page,
            comments: {
                ...page.comments,
                [commentIdx]: {
                    ...page.comments[commentIdx],
                    emojis: keptEmojis
                }
            }
        }
    }
}

export const deleteComment = (pages, pageName, commentIdx) => {
    const page = pages[pageName];
    const {[commentIdx]: commentToDelete, ...keptComments} = page.comments;
    return {
        ...pages,
        [pageName]: {
            ...page,
            comments: keptComments
        }

    }
}

export const editJournalTitle = (pages, pageName, journalIdx, newTitle) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: {
            ...page,
            entries: {
                ...page.entries,
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    title: newTitle
                }
            }
        }
    };
}

export const editJournalEmoji = (pages, pageName, journalIdx, newEmoji) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: {
            ...page,
            entries: {
                ...page.entries,
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    emoji: newEmoji
                }
            }
        }
    }
}

export const editJournalComment = (
        pages, pageName, journalIdx, commentIdx, commentText
    ) => {
    const page = pages[pageName];

    return {
        ...pages,
        [pageName]: {
            ...page,
            entries: {
                ...page.entries,
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    comments: {
                        ...page.entries[journalIdx].comments,
                        [commentIdx]: {
                            ...page.entries[journalIdx].comments[commentIdx],
                            timestamp:  JSON.stringify(new Date()),
                            comment: commentText,
                            edited: true
                        }
                    }
                }
            }
        }
    }
}

export const addJournalComment = (
    pages, pageName, journalIdx, commentText
) => {
    const page = pages[pageName];

    return {
        ...pages,
        [pageName]: {
            ...page,
            entries: {
                ...page.entries,
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    comments: {
                        ...page.entries[journalIdx].comments,
                        [calculateNextKey(page.entries[journalIdx].comments)]: {
                            timestamp:  JSON.stringify(new Date()),
                            comment: commentText,
                            edited: false, 
                            emojis: {}
                        }
                    }
                }
            }
        }
    }
}

export const addEmojiToJournalComment = 
    (pages, pageName, journalIdx, commentIdx, emojiPair) => 
        {
            const page = pages[pageName];
            return {
                ...pages,
                [pageName]: {
                    ...page,
                    entries: {
                        ...page.entries,
                        [journalIdx]: {
                            ...page.entries[journalIdx],
                            comments: {
                                ...page.entries[journalIdx].comments,
                                [commentIdx]: {
                                    ...page.entries[journalIdx].comments[commentIdx],
                                    emojis: {
                                        ...page.entries[journalIdx].comments[commentIdx].emojis,
                                        ...emojiPair
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


export const removeEmojiFromJournalComment = 
    (pages, pageName, journalIdx, commentIdx, emoji) => {
    const page = pages[pageName];

    const {[emoji]: desc, ...keptEmojis} = page.entries[journalIdx].comments[commentIdx].emojis;
    return {
        ...pages, 
        [pageName]: {
            ...page,
            entries: {
                ...page.entries, 
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    comments: {
                        ...page.entries[journalIdx].comments,
                        [commentIdx]: {
                            ...page.entries[journalIdx].comments[commentIdx],
                            emojis: keptEmojis
                        }
                    }
                }
            }
        }
    }
}

export const removeTagFromJournal = 
    (pages, pageName, journalIdx, tagName) => {
    const page = pages[pageName];
    const {[tagName]: associatedColor, ...keptTags} = page.entries[journalIdx].tags;
    return {
        ...pages, 
        [pageName]: {
            ...page,
            entries: {
                ...page.entries, 
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    tags: keptTags
                }
            }
        }
    }
}

export const addTagToJournal = 
    (pages, pageName, journalIdx, tagPair) => {
    const page = pages[pageName];
    return {
        ...pages, 
        [pageName]: {
            ...page,
            entries: {
                ...page.entries, 
                [journalIdx]: {
                    ...page.entries[journalIdx],
                    tags: {
                        ...page.entries[journalIdx].tags,
                        ...tagPair
                    }
                }
            }
        }
    }
}

// We don't actually need to update categories, all we need to do is change
// the category 
export const moveTodo = (pages, pageName, todoIdx, categoryDraggedTo) => {
    const page = pages[pageName];
    return {
        ...pages, 
        [pageName]: {
            ...page,
            todos: {
                ...page.todos, 
                [todoIdx]: {
                    ...page.todos[todoIdx],
                    category: categoryDraggedTo
                }
            }
        }
    }
}

export const updateTodoEmoji = (pages, pageName, todoIdx, newEmoji) => {
    const page = pages[pageName];

    console.log(page.todos);
    console.log(todoIdx);
    return {
        ...pages,
        [pageName]: {
            ...page,
            todos: {
                ...page.todos,
                [todoIdx]: {
                    ...page.todos[todoIdx],
                    emoji: newEmoji
                }
            }
        }
    }
}