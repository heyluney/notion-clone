import { useContext } from 'react';
import styles from './SideBarDetailItem.module.css';
import Icon from '../popups/Icon';

import { Link } from 'react-router-dom';
import { PageContext } from '../../App';

const SideBarDetailItem = ({idx, page}) => {
    const { changeCurrentPageId } = useContext(PageContext);

    return (
        <Link
            to={`/notion-clone/${idx}`}
            onClick={() => {
                changeCurrentPageId(idx)
            }}>
            {page}
        </Link>
    )
}
    

export default SideBarDetailItem;