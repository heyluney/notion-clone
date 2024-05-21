import { useContext } from "react";

import Header from "../components/title/Header";

import { PageContext } from "../App";

import Component from "./Component";

import { getEmoji, getAllChildComponents } from "../data/database/database_functions";
import Emoji from "../components/popups/Emoji";



const Page = ({page}) => {
    const { components } = useContext(PageContext)

    const pageComponents = getAllChildComponents(components, page.id);
    const emoji = getEmoji(components, page.id);

    return (
        <div>
            {/* <Header /> */}
            {/* <Emoji /> */}


            {/* {pageComponents.map(([component_id, component]) =>
                    <Component 
                        key={component_id} 
                        component_id={component_id} 
                        component={component} />)} */}

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