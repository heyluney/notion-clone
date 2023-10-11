

import { useContext, useState } from 'react';

import { PageContext, SlideOutContext } from '../../App';
import styles from './AddTag.module.css';

import { addTagToJournal } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';

import { pastelColors } from '../../data/color_constants';

const AddTag = () => {
    const { pages, currentPageName, changePages } = useContext(PageContext);
    const { slideOut } = useContext(SlideOutContext);
    const [currentValue, updateCurrentValue] = useState("Add Tag");
    return (
        <input className={styles.addTag}
        value={currentValue}
        onChange = {(e) => updateCurrentValue(e.target.value)}
        onClick = {() => updateCurrentValue("")}
        onKeyDown={e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const pastels = Object.values(pastelColors);
                const randomPastel = pastels[Math.floor(Math.random()*pastels.length)];
                const newPages = addTagToJournal(pages, currentPageName, slideOut, {
                    [e.target.value]: randomPastel });
                changePages(newPages);
                saveItem('pages', newPages);
                updateCurrentValue("Add Tag");
            }
        }} />
    )
}

export default AddTag;