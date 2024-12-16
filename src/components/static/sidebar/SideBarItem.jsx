import { useNavigate } from 'react-router-dom';

import styles from './SideBarItem.module.css';

import Emoji from '../header/Emoji';
import useHoverable from '../../../hooks/useHoverable';

import AddButton from '../buttons/AddButton';
import MoreButton from '../buttons/MoreButton';

const SideBarItem = ({ 
        page, 
        idx, 
        draggableState, 
        handleDragStart, 
        handleDrag, 
        handleDragOver, 
        handleDrop
    }) => {
    const navigate = useNavigate();
    const currentPageId = parseInt(window.location.hash.substring(2));
    const { hoverableStateHandlers: { handleMouseEnter, handleMouseLeave } } 
        = useHoverable();
    
    return (
        <>
            {draggableState.dropPageIdx === idx &&
                <div className={styles.droppable_area} />}

            <div className={currentPageId === page.id ? styles.sidebar_item_hover : styles.sidebar_item}
                draggable={true}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragStart={() => handleDragStart(page.id)}
                onDrag={(e) => handleDrag(e)}
                onDrop={handleDrop}
                onClick={() => {
                    navigate(`/${page.id}`);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.title}>
                    <Emoji emoji={page.content.emoji}/>
                    <div>{page.content.title}</div>
                </div>
                <div className={styles.others}>
                    <MoreButton />
                    <AddButton />
                </div>

            </div>
        </>
    )
}

export default SideBarItem;