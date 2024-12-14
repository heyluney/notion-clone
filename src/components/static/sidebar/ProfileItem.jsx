import { useState } from 'react';
import styles from './ProfileItem.module.css'; // Import css modules stylesheet as styles
import clark from '../../../assets/clark_profile.jpg';



const ProfileItem = () => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            
        <img className={styles.profile_img}
            src={clark}
            alt="clark_profile" />
        <div>Clark's Notion</div>

        </div>
    )
}

export default ProfileItem;