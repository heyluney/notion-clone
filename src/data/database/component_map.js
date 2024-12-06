import { componentLibrary, getComponent } from "./component_library"

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
    1: {
        title: "Untitled",
        emoji: getComponent(componentLibrary, "emoji", "dog")
    },
    3: getComponent(componentLibrary, "emoji", "dog"),
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