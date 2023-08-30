import { useContext } from 'react';

import styles from './Comments.module.css';

import { CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';


const EditComment = ({ idx, readOnly, comment, changeEdit, changeMouseOver }) => {
    const { comments, changeComments } = useContext(CommentContext);

    return (
        <textarea readOnly={readOnly}
                            defaultValue={comment}
                            className={styles.textarea}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const newComments = {
                                        ...comments,
                                        ...{
                                            [idx]:
                                            {
                                                timestamp: JSON.stringify(Date.now()),
                                                comment: e.target.value,
                                                edited: true
                                            }
                                        }
                                    }
                                    changeComments(newComments);
                                    saveItem('quicknote-comments', newComments);
                                    changeMouseOver(-1);
                                    changeEdit(-1);
                                }
                            }} />
    )
}

export default EditComment;
