import { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './SideBarDetailItem.module.css';

import { component_map } from '../../data/database/component_map';

import { PageContext } from '../../App';
import { getEmoji, getChildComponents } from '../../data/database/database_functions';

import SmallHeader from '../title/SmallHeader';

const SideBarDetailItem = ({ page }) => {
    const { components, activeComponents, changeActiveComponents } = useContext(PageContext);


    
    return (
        <div>
            <Link 
                to={`/notion-clone/${page.id}`}
                onClick={() => changeActiveComponents({
                    ...activeComponents,
                    "page": page.id
                })}>
                
                <SmallHeader
                    title={page.title}
                    emoji={getEmoji(components, page.id)} />
            </Link>
        </div>
    )
}


export default SideBarDetailItem;