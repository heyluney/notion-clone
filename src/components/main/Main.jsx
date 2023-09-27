import styles from './Main.module.css'

import Banner from './Banner';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PageContext } from '../../App';
import map from '../../utils/string_to_component_map';

const Main = () => {
    const { pages } = useContext(PageContext);
    const [allPages, active] = pages;
    console.log('activepage', active);
    return (
        <div className={styles.main}>
            <Banner currentPage={allPages[active]} />
            <div className={styles.right}>
                <Routes>
                    {Object.entries(allPages).map(([key, [_, __, path, ___, component]]) => {
                        const Component = map[component];
                        return (
                        <Route
                            key={key}
                            path={path}
                            element={<Component />}
                        />
                        )
                })}
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