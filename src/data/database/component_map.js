import { componentLibrary, getEmoji } from "./component_library"

// Mapping from human-readable component type to unique type identifier. Each component type maps to a unique frontend React component.
export const component_map = {
    "app": 0,
    "page": 1,
    "comment": 2,
    "emoji": 3,
    "tasklist": 4,
    "journal": 5,
    "task": 6,
    "entry": 7,
    "tag": 8,
    "category": 9
}

export const default_component_map = {
    "app": { title: "Clark's Notion!" },
    "page": { title: "Untitled" }
}
export const default_content_map = {
    'page': {
        title: "Untitled",
        emoji: getEmoji('dog')
    },
    1: {
        title: "Untitled",
        emoji: getEmoji("dog")
    },
    3: getEmoji("dog"),
    4: {
        title: "Untitled",
        categories: ['Not started', 'In progress', 'Done'],
    },
    6: {
        title: "Untitled"
    },
    9: {
        title: "Untitled"
    }
}