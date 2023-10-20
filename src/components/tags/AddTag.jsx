

import { useContext, useState } from 'react';

import { PageContext, PopupContext } from '../../App';
import styles from './AddTag.module.css';

import { addTagToJournal } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';

import { pastelColors } from '../../data/color_constants';

const AddTag = () => {
    const { pages, currentPageName, changePages, component } = useContext(PageContext);
    const { id } = component;
    
    const getRandomPastelColor = () => {
        const pastels = Object.values(pastelColors);
        return pastels[Math.floor(Math.random()*pastels.length)];
    }
    
    // Set the default tag color to highlight-grey. When the "choose a color"
    // color selector is toggled, a random color will be picked.
    const [currentTag, updateCurrentTag] = useState({
        tagText: "Add Tag",
        color: "rgb(234, 234, 233)"
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
                 
                        const newPages = addTagToJournal(pages, currentPageName, id, {
                            [currentTag.tagText]: currentTag.color });
                        changePages(newPages);
                        saveItem('pages', newPages);
                        updateCurrentTag({
                            tagText: "Add Tag",
                            color: "rgb(234, 234, 233)"
                        });
                    }
            }} />
            <div className={styles.color_selector_group}>
                <div className={styles.color}
                    style={{
                        backgroundColor: Object.values(pastelColors)[0],
                        backgroundImage: `-webkit-linear-gradient(30deg, 
                            ${Object.values(pastelColors)[2]} 50%, 
                            ${Object.values(pastelColors)[3]} 50%)`,
                        top: 0,
                        height: "20px",
                        width: "20px",
                        borderRadius: "4px",
                    }} 
                    onClick={
                        () =>  {
                            toggleColorSelector(!colorSelectorOpen);
                            updateCurrentTag({
                                ...currentTag, 
                                color: getRandomPastelColor()
                            })
                        }
                    }>
                </div>
                <div className={styles.color_selector}>
                    {Object.values(pastelColors).map(color =>
                        <div className={styles.color}
                            key={color}
                            onClick={() => {
                                updateCurrentTag({
                                    ...currentTag,
                                    color: color
                                })
                                toggleColorSelector(false)
                        }}
                            style={colorSelectorOpen ? {
                                backgroundColor: color,
                                height: "20px",
                                width: "20px",
                                borderRadius: "4px",
                                transition: "1s",
                            } : {
                                backgroundColor: color,
                                height: "0px",
                                width: "0px",
                                borderRadius: "4px",
                                transition: "1s",
                                transform: "translateY(-70px)"
                            }}>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default AddTag;