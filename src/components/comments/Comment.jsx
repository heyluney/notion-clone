import { useContext } from 'react';

import { PageContext } from '../../App';

import styles from './Comment.module.css'

import { getFullTimeString } from "../../utils/calculate_date";

import { getChildComponents } from '../../data/database/database_functions';

import Emoji from '../popups/Emoji';

const Comment = ({ component }) => {
    const { components } = useContext(PageContext);

    // getChildComponents(components, id, "emoji")
   // getChildComponents(components, id, "emoji")
    return (
        <div className={styles.comment}>
            <Emoji  />
            <div>{component.title}</div>
            <div>{getFullTimeString(component.timestamp)}</div>
        </div>
    )
}

export default Comment;