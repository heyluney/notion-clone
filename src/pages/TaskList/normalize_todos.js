import { getItem } from "../../utils/local_storage";

const normalizeTodos = (todos) => {
    const categories = {};
    for (let category in getItem('pages')['Task List'].categories) {
        categories[category] = {};
    }
    for (let [todoId, todo] of Object.entries(todos)) {
            if (categories[todo.category] === undefined) {
            categories[todo.category] = {};
        }
        categories[todo.category][todoId] = todo;
    }
    return categories;
}

export default normalizeTodos;