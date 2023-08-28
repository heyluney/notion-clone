import styles from './Main.module.css'

import Banner from './Banner';
import { Routes, Route } from 'react-router-dom';

import GettingStarted from '../../pages/GettingStarted'
import QuickNote from '../../pages/QuickNote';
import PersonalHome from '../../pages/PersonalHome';
import Journal from '../../pages/Journal';
import TaskList from '../../pages/TaskList';

const routes = [
    {
        path: "/",
        element: <GettingStarted />
    },
    {
        path: "/getting_started",
        element: <GettingStarted />
    },
    {
        path: "/quick_note",
        element: <QuickNote />
    },
    {
        path: "/personal_home",
        element: <PersonalHome />
    },
    {
        path: "/journal",
        element: <Journal />
    },
    {
        path: "/task_list",
        element: <TaskList />
    }
]

const Main = ({ page }) => {
    return (
            <div className={styles.main}>
                <Banner page={page} />
                <div className={styles.right}>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
    )
}

export default Main;