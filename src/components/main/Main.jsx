import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './Main.module.css'
import Banner from './Banner';

import { PageContext } from '../../App';

import ErrorPage from '../../pages/Error/ErrorPage';

import Page from '../../pages/Page';

const Main = ({ emoji, comments }) => {
    const { pages } = useContext(PageContext);
    return (
        <div className={styles.main}>
            <Banner />
            <div className={styles.right}>
                <Routes>
                    {Object.keys(pages)
                        .map((page_id) => {

                            return <Route key={page_id}
                                exact path={`/notion-clone/${page_id}`}
                                element={
                                    <Page page={pages[page_id]} />} />
                        })}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main;

// import { page_id_to_component_map } from '../../utils/maps';
// const Component = page_id_to_component_map[idx];
