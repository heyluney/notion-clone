import styles from './Comment.module.css'

import { getFullTimeString } from "../../utils/calculate_date";

const Comment = ({ component }) => {
    return (
        <div className={styles.comment}>
            <div>{component.title}</div>
            <div>{getFullTimeString(component.timestamp)}</div>
        </div>
    )
}

export default Comment;