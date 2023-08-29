import styles from './Main.module.css'

import Banner from './Banner';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import GettingStarted from '../../pages/GettingStarted'
import QuickNote from '../../pages/QuickNote/QuickNote';
import PersonalHome from '../../pages/PersonalHome';
import Journal from '../../pages/Journal';
import TaskList from '../../pages/TaskList/TaskList';


// ["Quick Note", "/quick_note", Earmark, QuickNote]
const Main = ({ currentPage, pages }) => {
    return (
        <div className={styles.main}>
            <Banner currentPage={currentPage} />
            <div className={styles.right}>
                <Routes>
                    {Object.entries(pages).map(([key, [currentName, path, icon, Component]]) => (
                        <Route
                            key={key}
                            path={path}
                            element={<Component name={currentName} icon={icon}/>}
                        />
                    ))}
                </Routes>
            </div>
        </div>
    )
}

export default Main;



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