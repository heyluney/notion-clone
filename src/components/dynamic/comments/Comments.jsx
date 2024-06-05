import styles from './Comments.module.css';

import { getFullTimeString } from '../../../utils/calculate_date';

const Comments = ({comments}) => {
    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
                Object.entries(comments).map(([idx, comment]) =>
                    <div className={styles.comment}
                        key={idx}>
                        <div>{comment.comment}</div>
                        <div>
                            {getFullTimeString(comment.timestamp
                            )}
                        </div>
                    </div>
            )}
        </div>
 
    )
}

export default Comments;
