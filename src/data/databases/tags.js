import { componentMap } from "../component_map"

// Tags are equivalent to categories in a task list 
export const defaultTags = {
    1: {
      text: "dog",
      parent_id: 2
    },
    2: {
      text: "ice cream",
      parent_id: 1
    },
    3: {
      text: "work hard play hard",
      parent_id: 3
    },
    4: {
      text: "marathon",
      parent_id: 3
    },
    5: {
      text: "sprint",
      parent_id: 3
    }
  }