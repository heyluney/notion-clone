import { useContext } from "react";
import { createDefaultTaskList } from "../data/database/database_functions";
import Header from './static/header/Header';
// import Header from "./static/header/header";

import { PageContext } from "../App";

import Component from "./Component";
import Banner from './static/banner/Banner';
// import { getComponentAttribute } from "../data/database/database_functions";

import styles from './Page.module.css'

const Page = ({ page }) => {
    const { components, changeComponents } = useContext(PageContext)
    return (
        <div className={styles.page}>
            <Banner 
                id={page.id}
                title={page.title} emoji={page.emoji} />

            <div className={styles.right}>
                <Header
                    key={page.id}
                    id={`Page_${page.id}`}
                    title={page.title}
                    emoji={components[page.id].emoji} />

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