import { useState, useContext } from 'react';

import styles from './Tags.module.css';

// import AddTag from './AddTag';
import { ImCross as Cross } from 'react-icons/im';
import Tag
 from './Tag';
const Tags = ({ tags }) => {
    return (
        <div className={styles.tags}>
            {Object.values(tags).map((tag, idx) =>
                <Tag key={idx} tag={tag.text}/>
            )}
        </div>
    )
}

export default Tags;