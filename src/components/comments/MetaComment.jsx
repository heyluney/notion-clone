import styles from './MetaComment.module.css';

import { getTimeString } from '../../utils/calculate_date';

const MetaComment = ({comment}) => {
    return (
        <div className={styles.header}>
        <div className={styles.meta}>
            <div className={styles.author}>Helen Yu</div>
            <div className={styles.date}>
                {`${getTimeString(comment.timestamp)}${comment.edited ? " (edited)" : ""}`}
            </div> 
        </div>
     </div> 
    )
}

export default MetaComment;