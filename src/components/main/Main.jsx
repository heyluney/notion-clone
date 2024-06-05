import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './Main.module.css'

import { PageContext } from '../../App';

import ErrorPage from '../../pages/Error/ErrorPage';

import Page from '../../pages/Page';

const Main = () => {
    const { components } = useContext(PageContext);

    const page_ids = components[0].children;
    return (
        <div className={styles.main}>
            <Routes>
                {page_ids.map(page_id =>
                    <Route
                        key={page_id}
                        exact path={`/notion-clone/${page_id}`}
                        element={<Page page={components[page_id]} />} />
                )}

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    )
}

export default Main;