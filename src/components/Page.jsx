import { useContext } from "react";

import Header from './static/header/Header';
// import Header from "./static/header/header";

import { PageContext } from "../App";

import Component from "./Component";
import Banner from './static/banner/Banner';
import { getComponentAttribute } from "../data/database/database_functions";

import styles from './Page.module.css'

const Page = ({ page }) => {
    const { components } = useContext(PageContext)

    // console.log("PAGE CHILDREN", page.children)  [6, 10, 11]
    return (
        <div className={styles.page}>
            <Banner title={page.title} emoji={page.emoji} />

            <div className={styles.right}>
                <Header
                    title={page.title}
                    emoji={
                        getComponentAttribute(components, page.id, "emoji")} />

                {page.children.map(component_id =>
                    <Component
                        key={component_id}
                        component_id={component_id}
                        component={components[component_id]} />)}
            </div>
        </div>
    )

}


export default Page;