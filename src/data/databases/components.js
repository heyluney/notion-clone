import { componentType } from "../component_map"
// Components are page-level. They have an order id because these components can be inserted in any particular order.
export const defaultComponents = {
  1: {
    title: "First todo list today!",
    categories: {
        1: "undone",
        2: "doing",
        3: "done",
        4: "roadtrips"
    },
    component_type: componentType['tasklist'],
    parent_id: 1,
    order_id: 3,
  },
  2: {
    title: "Journal",
    component_type: componentType['journal'],
    parent_id: 1,
    order_id: 4
  },
  3: {
    title: "Hi",
    edited: false,
    component_type: componentType['comment'],
    parent_id: 1,
    order_id: 2
  },
  4: {
    title: "Hello",
    edited: false,
    component_type: componentType['comment'],
    parent_id: 1,
    order_id: 1,
  }
};