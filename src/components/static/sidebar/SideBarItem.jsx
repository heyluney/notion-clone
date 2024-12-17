import { useNavigate  } from 'react-router-dom';
import { useContext, useId } from 'react';

import styles from './SideBarItem.module.css';

import Emoji from '../header/Emoji';
import Button from '../buttons/Button';

import { PageContext } from '../../../App';

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
    const { hoverStateHandlers: { handleMouseEnter, handleMouseLeave }  }
        = useContext(PageContext);

    return (
        <div>
            {
            draggableState.dropPageIdx === idx && 
            <div className={styles.droppable_area} />
            }
                
            <div className={
                active ? styles.sidebar_item_hover : styles.sidebar_item}

                draggable={true}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragStart={() => handleDragStart(page.id)}
                onDrag={(e) => handleDrag(e)}
                onDrop={handleDrop}
                onClick={(e) => {
                    if (e.target === e.currentTarget)
                        navigate(`/${page.id}`);
                }}
                onMouseEnter={(e) => handleMouseEnter(e, page.id)}
                onMouseLeave={handleMouseLeave}
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