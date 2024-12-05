import QuickNote from '../pages/QuickNote/QuickNote';
import TaskList from '../pages/TaskList/TaskList';
import Journal from '../components/journal/Journal';
import Home from '../pages/Home/Home';

export const page_id_to_component_map = {
    0: Home,
    1: QuickNote,
    2: TaskList,
    3: Journal
}

// Maps the url to the currentPageName.
// export const url_map = {
//     "/notion-clone": 0,
//     "/notion-clone/": 0,
//     "/notion-clone/1": 1,
//     "/notion-clone/2": 2,
//     "/notion-clone/3": 3
// }

// Maps each table to a unique identifier (for component_type foreign key).
export const component_type_map = {
    "pages": 1,
    "comments": 2,
    "tasklists": 3,
    "journals": 4,
}

