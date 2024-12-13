import { createDefaultTaskList } from "../data/database/database_functions";
import Header from './static/header/Header';

import Component from "./Component";
import Banner from './static/banner/Banner';

import styles from './Page.module.css'
import { useContext } from "react";
import { PageContext } from "../App";

const Page = ({ page }) => {
    const {components, changeComponents} = useContext(PageContext);
    const { title, emoji } = page.content;
    return (
        <div className={styles.page}>
            <Banner 
                id={page.id}
                title={title} emoji={emoji} />

            <div className={styles.right}>
                <Header
                    key={page.id}
                    id={`Page_${page.id}`}
                    title={title}
                    emoji={emoji} />

                {page.children.map(component_id =>
                    <Component
                        key={component_id}
                        component_id={component_id}
                        component={components[component_id]} />)}

                <button onClick={() => {
                    const updatedComponents = 
                        createDefaultTaskList(components, page.id);
                    changeComponents(updatedComponents);
                }}>Create a Tasklist</button>
            </div>
        </div>
    )

}


export default Page;