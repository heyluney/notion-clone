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

export const default_content_map = {
    "page": {
        title: "Random title",
        emoji: getComponent(componentLibrary, "emoji", "dog")
    },
    "emoji": getComponent(componentLibrary, "emoji", "dog"),
    "journal": {},
    "tasklist": {}
}