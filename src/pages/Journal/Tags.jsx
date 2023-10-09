import styles from './Tags.module.css';

const Tags = ({tags, full}) => {
    return (
        <div className={`${styles.tags} 
                        ${full ? styles.tags_full : null}`}>
            {tags.map((tag, idx) =>
                <div key={idx} className={styles.tag}>
                    {tag}
                </div>
            )}
        </div> 
    )
}

export default Tags;