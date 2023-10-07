import { useContext } from 'react';
import { PageContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';

import { addComment } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';


const AddComment = ({ currentComment, updateComment }) => {
    const { pages, changePages, currentPageName } = useContext(PageContext);
    return (
        <div className={styles.new}>
        <img className={styles.pic} src={clark} />
        <textarea
            name="postContent"
            value={currentComment}
            onChange={(e) => {
                updateComment(e.target.value);
            }}
            onClick={() => {
                updateComment("");
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const newPages = addComment(pages, currentPageName, e.target.value);
                    changePages(newPages);
                    saveItem('pages', newPages);
                    updateComment("");
                }
            }}
        >
            <div className={styles.content}></div>
        </textarea>
        </div>
    )
}

export default AddComment;