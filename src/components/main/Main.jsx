import styles from './Main.module.css'

import Banner from './Banner';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import { PageContext } from '../../App';

import { page_id_to_component_map } from '../../utils/maps';

const Main = () => {
    const { pages } = useContext(PageContext);
    return (
        <div className={styles.main}>
            {/* <Banner /> */}
            <div className={styles.right}>
                <Routes>
                    {Object.keys(pages)
                    .map(idx => {
                            const Component = page_id_to_component_map[idx];
                            return <Route key={idx}
                                            path={`/notion-clone/${idx}`}
                                            element={<Component />} />
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