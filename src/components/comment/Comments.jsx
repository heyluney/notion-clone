import { useState, useEffect } from 'react';
import styles from './Comments.module.css';

import clark from '../../assets/clark_profile.jpg';

import getTimeString from '../../utils/calculate_time_elapsed';


const Comments = () => {
    if (localStorage.getItem('quicknote-comments') == null || localStorage.getItem('quicknote-comments') === 'undefined') {
        localStorage.setItem('quicknote-comments', JSON.stringify([]));
    }
    const [color, setColor] = useState("white"); 
    const [opacity, setOpacity] = useState(1);

    const savedComments = JSON.parse(localStorage.getItem('quicknote-comments'));
    const [comments, addComment] = useState(savedComments);
    const [currentComment, updateComment] = useState("");

    
    const [commentBeingMousedOver, changeMouseOver] = useState(-1);
    const [commentBeingEdited, changeEdit] = useState(-1);

    useEffect(() => {
        document.body.style.backgroundColor = color;
        document.body.style.opacity = opacity;
    }, [color, opacity]);

    return (
        <div className={styles.comments}>
            {Object.keys(comments).length == 0 ? "" : comments.map((comment, idx) => 
                <div className={styles.comment} 
                    key={idx}
                    onMouseEnter={() => {
                        if (commentBeingEdited == -1) changeMouseOver(idx);
                    }} 
                    >
                    
                    <img className={styles.pic} src={clark}/>
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <div className={styles.meta}>
                                <div className={styles.author}>Helen Yu</div>
                                <div className={styles.date}>{`${getTimeString(comment.timestamp)}${comment.edited ? " (edited)" : ""}`}</div>
                            </div>
                            {
                                idx == commentBeingMousedOver ?
                                <div>
                                    <button onClick={() => {
                                        changeEdit(idx);
                                    }}>Edit</button>
                                    <button onClick={() => {
                                        setColor('rgba(111, 111, 111, 1)');
                                        setOpacity(0.5);
                                    }}>Delete</button> 
                                </div> : ""
                            }
                        </div>
                        <textarea readOnly={!(idx == commentBeingEdited)} 
                                    defaultValue={comment.comment}
                                    className={styles.textarea}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            comments[idx] = {
                                                timestamp: JSON.stringify(Date.now()), 
                                                comment: e.target.value,
                                                edited: true};
                                            addComment(comments);
                                            localStorage.setItem('quicknote-comments', JSON.stringify(comments));
                                            changeMouseOver(-1);
                                            changeEdit(-1);
                                        }
                                    }} />
                    </div>
                </div>
            )}


            <div>
                <textarea 
                    name="postContent" 
                    value={currentComment}
                    onChange={(e) => {
                        updateComment(e.target.value);

                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log(comments);
                            const currentTimestamp = JSON.stringify(new Date());
                            comments.push({timestamp: currentTimestamp, comment: currentComment, edited: false});
                            addComment(comments);
                            localStorage.setItem('quicknote-comments', JSON.stringify(comments));
                            updateComment("");
                        }
                    }}
                    />
            </div>
        </div>
    )
}

export default Comments;