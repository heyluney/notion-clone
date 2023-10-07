import { calculateNextKey } from "../utils/calculate_next_key";
// Note: All functions are pure functions - create a copy of the original 
// state before modifying.

// Merges comment into comments on the page. 
const mergeComment = (page, comment) => {
    return {
        ...page,
        comments: {
            ...page.comments,
            ...comment
        }
    }
}
// Transforms text entered into new comment object, with a unique key.
const createComment = (page, commentText) => {
    return {
        [calculateNextKey(page.comments)]: {
            timestamp: JSON.stringify(new Date()),
            comment: commentText,
            edited: false,
            emojis: {}
        }
    }
}

// Replaces original text in comment with updated comment text.
const updateComment = (comment, commentText, commentIdx) => {
    return {
         [commentIdx]: {
             ...comment,
             timestamp: JSON.stringify(new Date()),
             comment: commentText,
             edited: true
         }
    } 
}

// Removes emoji from comment.
const deleteEmojiFromComment = (comment, emojiToDelete, commentIdx) => {
    const {[emojiToDelete]: desc, ...keptEmojis} = comment.emojis;
    return {
        [commentIdx]: {
            ...comment, 
            emojis: keptEmojis
        }
    }
}

const addEmojiToComment = (comment, emojiToAdd, commentIdx) => {
    const blah = {
        [commentIdx]: {
            ...comment,
            emojis: {...comment.emojis, ...emojiToAdd}
        }
    }
    return blah;
}
// All of these functions are page-level -> they return the entire "pages" object,
// which can be subsequently saved in local storage.
export const addEmoji = (pages, pageName, commentIdx, emoji) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]:
             mergeComment(page, addEmojiToComment(
                page.comments[commentIdx], emoji, commentIdx))
    }
}

export const updateEmoji = (pages, pageName, hexcode) => {
    const page = pages[pageName];
    return {
        ...pages,
        [pageName]: {...page, icon: hexcode}
    }
}

export const removeEmoji = (pages, pageName, commentIdx, emoji) => {
    const page = pages[pageName];
    return {
        ...pages, 
        [pageName]: mergeComment(page, 
            deleteEmojiFromComment
            (page.comments[commentIdx], emoji, commentIdx))
    }
}

export const addComment = (pages, pageName, commentText) => {
    const page = pages[pageName];
    return {...pages, [pageName]: 
        mergeComment(page, createComment(page, commentText))
    }
}

export const editComment = (pages, pageName, commentText, commentIdx) => {
    const page = pages[pageName];
    const comment = page.comments[commentIdx];
    return {
        ...pages,
        [pageName]: mergeComment(page, 
            updateComment(comment, commentText, commentIdx))
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




