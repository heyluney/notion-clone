import QuickNote from '../pages/QuickNote/QuickNote';
import TaskList from '../pages/TaskList/TaskList';
import Journal from '../pages/Journal/Journal';
import Home from '../pages/Home/Home';

export const page_id_to_component_map = {
    0: Home,
    1: QuickNote,
    2: TaskList,
    3: Journal
}

// Maps the url to the currentPageName.
export const url_map = {
    "/notion-clone": 0,
    "/notion-clone/": 0,
    "/notion-clone/1": 1,
    "/notion-clone/task_list": 2,
    "/notion-clone/journal": 3
}

export const entity_to_entity_id_map = {
    "page": 1
}

