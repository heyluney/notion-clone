import { useContext } from 'react';
import { PageContext } from '../../App';

import styles from './AddComment.module.css';
import clark from '../../assets/clark_profile.jpg';

import { addComment, addJournalComment } from '../../data/pages_helper_functions';

import { saveItem } from '../../utils/local_storage';


const AddComment = ({ currentComment, updateComment }) => {
    const { pages, changePages, currentPageName, component } = useContext(PageContext);
    const { id, type } = component;
    return (
        <div className={styles.new}>
        <img className={styles.pic} src={clark} alt="clarkie_profile_photo" />
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
                    let newPages;
                    switch(type) {
                        case 'journal_comments': 
                            newPages = addJournalComment(pages, currentPageName, id, e.target.value);
                            break;
                        default: 
                            // Default is to update the comment associated with the page.
                            newPages = addComment(pages, currentPageName, e.target.value);
                            break;
                    }
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