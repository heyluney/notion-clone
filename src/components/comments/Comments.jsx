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
    const { pages, currentPageName, component } = useContext(PageContext);
    const comments = 
        passedComments === undefined ? 
        pages[currentPageName].comments : passedComments;

    const [itemBeingMousedOver, changeMouseOver] = useState(-1);
    const [currentComment, updateComment] = useState("Add a comment...");

    return (
        <div className={styles.comments}>
            {Object.keys(comments).length === 0 ? "" : 
            
            Object.entries(comments).map(([idx, comment]) =>
                    <div className={styles.comment}
                        key={idx}
                        onMouseEnter={() => {
                            changeMouseOver(idx);
                        }}
                        onMouseLeave={() => {
                            changeMouseOver(-1);
                        }}
                    >
                        <img className={styles.pic} 
                            src={clark}         
                            alt="clark_profile" />
                        <div className={styles.text}>
                            <MetaComment comment={comment}/>

                            <EditComment
                                idx={idx}
                                comment={comment.comment}
                                changeMouseOver={changeMouseOver} 
                                type={type}/>

                            <CommentEmojis idx={idx} comment={comment} />
                        </div>
                    
                    {component.id !== idx &&
                        <div className={styles.buttons}>
                            <EditButton idx={idx} 
                                itemBeingMousedOver={itemBeingMousedOver} />
                            <DeleteButton idx={idx}
                                itemBeingMousedOver={itemBeingMousedOver}/>
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
