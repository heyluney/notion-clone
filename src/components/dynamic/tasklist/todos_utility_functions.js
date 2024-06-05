
// Sorts todos into relevant categories each todo belongs to.
export const sortTodosIntoCategories = (todos, categories) => {
    const categorizedTodos = {};
    for (let category_id in categories) {
        categorizedTodos[category_id] = {};
    }

    for (let todo_id in todos) {
        const todo = todos[todo_id];
        categorizedTodos[todo.category_id][todo_id] = todo;
    }

    // console.log('categories', categories)
    return categorizedTodos;
}

