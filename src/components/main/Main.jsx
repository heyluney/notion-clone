import styles from './Main.module.css'

import Banner from './Banner';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PageContext } from '../../App';

// if a page has 
const Main = () => {
    const { pages, _ } = useContext(PageContext);
    const [allPages, active] = pages;
    return (
        <div className={styles.main}>
            <Banner currentPage={allPages[active]} />
            <div className={styles.right}>
                <Routes>
                    {Object.entries(allPages).map(([key, [_, path, __, Component]]) => (
                        <Route
                            key={key}
                            path={path}
                            element={<Component />}
                        />
                    ))}
                </Routes>
            </div>
        </div>
    )
}

export default Main;




// import GettingStarted from '../../pages/GettingStarted'
// import QuickNote from '../../pages/QuickNote/QuickNote';
// import PersonalHome from '../../pages/PersonalHome';
// import Journal from '../../pages/Journal';
// import TaskList from '../../pages/TaskList/TaskList';
// const routes = [
//     {
//         path: "/",
//         element: <GettingStarted />
//     },
//     {
//         path: "/getting_started",
//         element: <GettingStarted />
//     },
//     {
//         path: "/quick_note",
//         element: <QuickNote />
//     },
//     {
//         path: "/personal_home",
//         element: <PersonalHome />
//     },
//     {
//         path: "/journal",
//         element: <Journal />
//     },
//     {
//         path: "/task_list",
//         element: <TaskList emoji={128516} />,
//     }
// ]