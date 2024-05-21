import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './Main.module.css'
import Banner from './Banner';

import { getChildComponents } from '../../data/database/database_functions';

import { PageContext } from '../../App';

import ErrorPage from '../../pages/Error/ErrorPage';

import Page from '../../pages/Page';

const Main = () => {
    const { components } = useContext(PageContext);
    const pages = getChildComponents(components, 0, "page");

    // We have to order the c
    return (
        <div className={styles.main}>
            <Banner />
            <div className={styles.right}>
                <Routes>
                    {pages.map(page =>
                        <Route
                            key={page.id}
                            exact path={`/notion-clone/${page.id}`}
                            element={<Page page={page} />} />
                    )}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main;

// import { page_id_to_component_map } from '../../utils/maps';
// const Component = page_id_to_component_map[idx];
