import { useState, useContext } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import { PageContext } from '../../App';
import AddComment from './AddComment';
import EditComment from './EditComment';

import CommentEmojis from './CommentEmojis';

import EditButton from '../buttons/EditButton';
import DeleteButton from '../buttons/DeleteButton';

import MetaComment from './MetaComment';

const Comments = ({passedComments, type}) => {
    const { pages, currentPageName } = useContext(PageContext);
    const comments = 
        passedComments === undefined ? 
        pages[currentPageName].comments : passedComments;

    const [commentBeingMousedOver, changeMouseOver] = useState(-1);

    // Keeps track of the index of the current comment being edited.
    const [commentBeingEdited, changeCommentBeingEdited] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
            Object.entries(comments).map(([idx, comment]) =>
                    <div className={styles.comment}
                        key={idx}
                        onMouseEnter={() => {
                            if (commentBeingEdited === -1) 
                            changeMouseOver(idx);
                        }}
                    >
                        <img className={styles.pic} src={clark}         
                        alt="clark_profile" />
                        <div className={styles.text}>
                            <MetaComment comment={comment}/>

                            <EditComment
                                idx={idx}
                                comment={comment.comment}
                                commentBeingEdited={commentBeingEdited}
                                changeCommentBeingEdited={changeCommentBeingEdited}
                                changeMouseOver={changeMouseOver} 
                                type={type}/>

                            <CommentEmojis idx={idx} comment={comment} type={type}/>
                        </div>
                    
                    {commentBeingEdited !== idx &&
                        <div className={styles.buttons}>
                            <EditButton idx={idx} changeCommentBeingEdited={changeCommentBeingEdited}
                                commentBeingMousedOver={commentBeingMousedOver} />
                            <DeleteButton idx={idx}
                                commentBeingMousedOver={commentBeingMousedOver}/>
                        </div>}
                </div>
            )}
            <AddComment
                currentComment={currentComment}
                updateComment={updateComment}
                type={type}/>
        </div>
    )
}

export default Comments;
