import { useContext, useState } from 'react';
import { PageContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';


const AddComment = ({componentType, componentId}) => {

    const [comment, changeComment] = useState("");

    return (
        <div className={styles.new}>
        <img className={styles.pic} src={clark} alt="clarkie_profile_photo" />
            <textarea
                name="postContent"
                value={comment}
                onChange={(e) => {
                    changeComment(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        
     
                        changeComment("");
                    }
                }}
            />
        </div>
    )
}

export default AddComment;