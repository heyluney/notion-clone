import { useContext } from "react";

import Header from "../components/title/Header";

import { PageContext } from "../App";

import Component from "./Component";

const Page = () => {
    const { currentPageId,
        comments,
        components } = useContext(PageContext);

    const findPageComponents = (parentPageId) => {
        return Object.entries(components)
            .filter(
                ([idx, component]) => 
                    component.parent_id == parentPageId
            )
            .sort(
                (a, b) => a[1].order_id - b[1].order_id
            );
    }
    const pageComponents = findPageComponents(currentPageId);

    console.log('pageComponents', pageComponents);
    return (
        <div>
            <Header />

            {pageComponents.map(([component_id, component]) =>
                    <Component 
                        key={component_id} 
                        component_id={component_id} 
                        component={component} />)}

        </div>
    )

}


{/* <Comments
                comments={
                    findComponents(
                        comments,
                        "pages",
                        currentPageId)} /> */}

export default Page;