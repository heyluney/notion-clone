import { useContext } from 'react';

import styles from './EditComment.module.css'

import { CommentContext } from '../../App';

import { saveItem } from '../../utils/local_storage';


const EditComment = ({ idx, 
                commentBeingEdited, 
                comment, 
                changeCommentBeingEdited, 
                changeMouseOver }) => {
    const { comments, changeComments } = useContext(CommentContext);
    // console.log('comment', comment) 
    // need to save value of comment 
    return (
        <textarea readOnly={!commentBeingEdited}
                            defaultValue={comment}
                            className={commentBeingEdited === idx ? styles.active : styles.textarea}
                            onClick={() => {
                                changeCommentBeingEdited(idx);
                            }}
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
                                    changeCommentBeingEdited(-1);
                                }
                            }} />
    )
}

export default EditComment;
