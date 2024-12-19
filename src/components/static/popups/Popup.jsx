

import DynamicComponent from '../../../hooks/DynamicComponent';

// Abstract "Popup" component, specific popup is dynamically rendered.
const Popup = ({componentName, visible, text}) => {
    return (visible && 
        <DynamicComponent componentName={componentName} text={text}/>)

}



export default Popup;