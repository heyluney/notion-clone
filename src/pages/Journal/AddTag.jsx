

import { useContext, useState, Fragment } from 'react';

import { PageContext, SlideOutContext } from '../../App';
import styles from './AddTag.module.css';

import { addTagToJournal } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';

import { pastelColors } from '../../data/color_constants';

const AddTag = () => {
    const { pages, currentPageName, changePages } = useContext(PageContext);
    const { slideOut } = useContext(SlideOutContext);
    // const [currentValue, updateCurrentValue] = useState("Add Tag");

    const getRandomPastelColor = () => {
        const pastels = Object.values(pastelColors);
        return pastels[Math.floor(Math.random()*pastels.length)];
    }
    const [currentTag, updateCurrentTag] = useState({
        tagText: "Add Tag",
        color: getRandomPastelColor()
    });
    const [colorSelectorOpen, toggleColorSelector] = useState(false);
    return (
        <div className={styles.group}>
            <input className={styles.add_tag}
            style={{
                    backgroundColor: currentTag.color
                }}
                value={currentTag.tagText}
                onChange = {(e) => updateCurrentTag({
                    ...currentTag,
                    tagText: e.target.value
                })}
                onClick = {() => updateCurrentTag({
                    ...currentTag,
                    tagText: ""
                })}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                 
                        const newPages = addTagToJournal(pages, currentPageName, slideOut, {
                            [currentTag.tagText]: currentTag.color });
                        changePages(newPages);
                        saveItem('pages', newPages);
                        updateCurrentTag({
                            tagText: "Add Tag",
                            color: "rgb(234, 234, 233)"
                        });
                    }
            }} />
            <div className={styles.color_selector}>

                <div className={styles.color}
                    style={{
                        backgroundColor: Object.values(pastelColors)[0],
                        backgroundImage: `-webkit-linear-gradient(30deg, 
                            ${Object.values(pastelColors)[2]} 50%, 
                            ${Object.values(pastelColors)[3]} 50%)`,
                        height: "20px",
                        width: "20px"
                    }} 
                    onClick={
                        () =>  toggleColorSelector(!colorSelectorOpen)
                    }>
                </div>
                {colorSelectorOpen && Object.values(pastelColors).map(color =>
                    <div className={styles.color}
                        key={color}
                        onClick={() => updateCurrentTag({
                            ...currentTag,
                            color: color
                        })}
                        style={{
                            backgroundColor: color,
                            height: "20px",
                            width: "20px"
                        }}>
                    </div>)}
            </div>
        </div>
    )
}

export default AddTag;