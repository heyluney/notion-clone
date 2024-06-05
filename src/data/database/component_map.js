import { componentLibrary, getRandomComponent } from "./component_library"

// Mapping from human-readable component type to unique type identifier.
export const component_map = {
    "app": 0,
    "page": 1,
    "comment": 2,
    "emoji": 3,
    "tasklist": 4,
    "journal": 5,
    "task": 6,
    "entry": 7,
    "tag": 8
}

export const default_content_map = {
    "page": {
        title: getRandomComponent(componentLibrary, "title"),
        emoji: getRandomComponent(componentLibrary, "emoji")
    },
    "emoji": "1F3D4 FE0F"
}