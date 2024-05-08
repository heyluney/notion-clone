import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './Main.module.css'
import Banner from './Banner';

import { PageContext } from '../../App';

import { page_id_to_component_map } from '../../utils/maps';
import ErrorPage from '../../pages/Error/ErrorPage';

const Main = ({emoji, comments}) => {
    const { pages } = useContext(PageContext);
    return (
        <div className={styles.main}>
            <Banner />
            <div className={styles.right}>
                <Routes>
                    {Object.keys(pages)
                    .map(idx => {
                            const Component = page_id_to_component_map[idx];
                            return <Route key={idx}
                                            exact path={`/notion-clone/${idx}`}
                                            element={<Component 
                                                    emoji={emoji} 
                                                    comments={comments}/>} />
                        })}
                        <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main;