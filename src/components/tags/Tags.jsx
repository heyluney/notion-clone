import { useState, useContext } from 'react';

import { PageContext, PopupContext } from '../../App';

import styles from './Tags.module.css';

import { removeTagFromJournal } from '../../data/pages_helper_functions';
import { saveItem } from '../../utils/local_storage';

import AddTag from './AddTag';
import { ImCross as Cross } from 'react-icons/im';

const Tags = ({ addTagsShown, journalIdx, tags, full }) => {
    const { pages, changePages, currentPageName, component } = useContext(PageContext);
    const { id } = component;

    const [deleteButtonsShown, toggleDeleteButtonsShown] 
        = useState(-1);
    const [activeTag, toggleActiveTag] = useState(-1);

    return (
        <div className={`${styles.tags} 
                        ${full ? styles.tags_full : null}`}>
            {tags && Object.entries(tags).map(([tag, color], idx) =>
                <div 
                        style={{
                            backgroundColor: color
                        }}
                        key={idx} className={`${styles.tag}`}
                        onMouseEnter={() => {
                            toggleDeleteButtonsShown(idx)
                        }}
                        onMouseLeave={() => toggleDeleteButtonsShown(-1)}
                    >
                    
                    {tag}
                
                    {
                        deleteButtonsShown === idx && <Cross className={`${styles.delete}`}
                        style={idx === activeTag ? {
                            backgroundColor: color,
                            filter: "brightness(0.8)",
                            cursor: "pointer"
                        } : {}}
                        onMouseEnter={() => toggleActiveTag(idx)}
                        onMouseLeave={() => toggleActiveTag(-1)}
                        onClick={() => {
                            const newPages = removeTagFromJournal(pages, currentPageName, 
                                journalIdx !== undefined ? journalIdx : id, tag);
                            changePages(newPages);
                            saveItem('pages', newPages)}} />
                    }
                </div>
                
            )}
            {addTagsShown && <AddTag className={`${styles.tag} ${styles.add_tag}`} />}
        </div>
    )
}

export default Tags;