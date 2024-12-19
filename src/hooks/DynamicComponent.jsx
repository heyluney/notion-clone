import MorePopup from '../components/static/popups/MorePopup';
import NewPopup from '../components/static/popups/NewPopup';
import InfoPopup from '../components/static/popups/InfoPopup';

import TaskList from "../components/dynamic/tasklist/TaskList"
import Journal from "../components/dynamic/journal/Journal";
import Comment from "../components/dynamic/comments/Comment";

// Types of popups that can be dynamically rendered
const componentsPopup = {
    "morePopup": MorePopup,
    "newPopup": NewPopup,
    "infoPopup": InfoPopup
};

const componentsComponents = {
    "TaskList": TaskList,
    "Journal": Journal,
    "Comment": Comment
}

const components = {...componentsPopup, ...componentsComponents};

// Creates a dynamic react component based on the componentName, passing down props.
const DynamicComponent = (props) => {
    const { componentName, ...rest } = props;
    const Component = components[componentName];
    if (!Component) return <div>{componentName} not found!</div>
    return <Component {...rest} />
}

export default DynamicComponent;