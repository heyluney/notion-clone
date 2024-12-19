import { useNavigate } from 'react-router-dom';
import { PageContext } from '../../../App';
import { useContext, useId } from 'react';

import styles from './SideBarItem.module.css';

import Emoji from '../header/Emoji';
import Button from '../buttons/Button';

const SideBarItem = ({
        active,
        page, 
        idx, 
        draggableState, 
        handleDragStart, 
        handleDrag, 
        handleDragOver, 
        handleDrop
    }) => {
    const navigate = useNavigate();

    const { changePageId } = useContext(PageContext);
    return (
        <div>
            {<div className={draggableState.dropPageIdx === idx ? styles.droppable_area_active : styles.droppable_area} />}
                
            <div className={`${styles.sidebar_item} ${active ? styles.highlight : ''}`}
                draggable={true}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragStart={() => handleDragStart(page.id)}
                onDrag={(e) => handleDrag(e)}
                onDrop={handleDrop}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        navigate(`/${page.id}`);
                        changePageId(page.id);
                    }
                        
                }}
            >
                <div className={styles.title}>
                    <Emoji emoji={page.content.emoji}/>
                    <div>{page.content.title}</div>
                </div>
                {<div className={styles.others}>
                    <Button type="ellipses" 
                            id={useId()} 
                            parentId={page.id} />
                    <Button type="plus"
                            id={useId()} 
                            parentId={page.id} />
                </div>}

            </div>
        </div>
    )
}

export default SideBarItem;