import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { moveComponent } from '../../../data/database/database_functions';
import { PageContext } from '../../../App';
import { getComponentAttribute, deleteComponent, duplicateComponent } from '../../../data/database/database_functions';

import Header from '../header/Header';

const SideBarDetailItem = ({ page, idx,  changeDraggedPageId, changeDropPageIdx, draggedPageId, dropPageIdx }) => {
    const { components,
        changeComponents } = useContext(PageContext);

    const onDrop = () => {
        const updatedComponents = moveComponent(components, draggedPageId, 0, dropPageIdx);
        changeComponents(updatedComponents);
    }

    return (
        <div className={styles.sidebar_item}
            onDragOver={e => {
                e.preventDefault();
                changeDropPageIdx(idx);
            }}
            onDrag={e => {
                e.preventDefault();
                changeDraggedPageId(page.id);
            }}
            onDrop={() => onDrop()}>
            <Link 
                to={`/notion-clone/${page.id}`}
               >
                
            <Header
                id={`SideBarDetailItem_${page.id}`}
                isSmall={true}
                title={page.title}
                emoji={getComponentAttribute(components, page.id, "emoji")} />
                
            </Link>
            
            <button onClick={() => changeComponents(duplicateComponent(components, page.id))}>Dupe</button>
            {/* <button onClick={() => 
                changeComponents(deleteComponent(components, page.id))}>
                    Delete
            </button> */}
        </div>
    )
}


export default SideBarDetailItem;