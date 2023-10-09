import styles from './Tags.module.css';

const Tags = ({tags}) => {
    return (
        <div className={styles.tags}>
            {tags.map((tag, idx) =>
                <div key={idx} className={styles.tag}>
                    {tag}
                </div>
            )}
        </div> 
    )
}

export default Tags;