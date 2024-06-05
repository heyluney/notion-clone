import { useState } from 'react';
import styles from './ProfileItem.module.css'; // Import css modules stylesheet as styles



const ProfileItem = ({name, icon}) => {
    const [isHovered, updateHover] = useState(false);
    return (
        <div 
            className={`${styles.main} ${isHovered ? styles.active : styles.inactive}`}
            onMouseEnter={() => updateHover(!isHovered)}
            onMouseLeave={() => updateHover(!isHovered)}
        >
            <div>{icon}</div>
            <div>{name}</div>

        </div>
    )
}

export default ProfileItem;