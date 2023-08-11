import styles from './Banner.module.css'

const Banner = ({page}) => {
    const [name, icon] = page;
    const Icon = icon;
    return (
        <div className={styles.banner}>
             <Icon />
             <div>{name}</div>
        </div>
    )
}

export default Banner;