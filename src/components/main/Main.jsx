import styles from './Main.module.css'

import Banner from './Banner';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PageContext } from '../../App';
import map from '../../utils/string_to_component_map';
import Home from '../../pages/Home/Home';
const Main = () => {
    const { currentPageName, pages } = useContext(PageContext);
    return (
        <div className={styles.main}>
            <Banner currentPage={pages[currentPageName]} />
            <div className={styles.right}>
                <Routes>
                    {Object.values(pages)
                        .map(({name, component, path}) => {
                            const Component = map[component];
                            return <Route key={name}
                                            path={path}
                                            element={<Component/>} />
                        })}
                    {/* <Route key="root" path="/notion-clone" element={<Home />}/> */}
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