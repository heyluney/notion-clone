import styles from './Main.module.css'

import Banner from './Banner';
import { Routes, Route } from 'react-router-dom';

import GettingStarted from '../../pages/GettingStarted'
import QuickNote from '../../pages/QuickNote';
import Journal from '../../pages/Journal';

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
        path: "/journal",
        element: <Journal />
    }
]

const Main = ({ page }) => {
    return (
            <div className={styles.main}>
                <Banner page={page} />
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
    )
}

export default Main;