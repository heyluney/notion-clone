import { useContext } from 'react';

import { PageContext } from '../../../App';

import styles from './Comment.module.css'

import { getFullTimeString } from "../../../utils/calculate_date";

const Comment = ({ component }) => {
    const { components } = useContext(PageContext);

    return (
        <div className={styles.comment}>
            {/* <Emoji  /> */}
            <div>{component.title}</div>
            <div>{getFullTimeString(component.timestamp)}</div>
        </div>
    )
}

export default Comment;