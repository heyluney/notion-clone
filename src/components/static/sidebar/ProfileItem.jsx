import { useState } from 'react';
import styles from './ProfileItem.module.css'; // Import css modules stylesheet as styles
import clark from '../../../assets/clark_profile.jpg';



const ProfileItem = ({name, icon}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            
            {/* <div>{<img className={styles.profile}
                    src={clark}
                    alt="clark_profile" />}</div> */}
            <div>{icon}</div>
            <div>{name}</div>

        </div>
    )
}

export default ProfileItem;