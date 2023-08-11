import React from 'react';
import styles from './Main.module.css'

// this is going to have props 

const Main = ({page}) => {
    const [name, icon] = page;
    const Icon = icon;
    return (
        <h1 className={styles.main }><Icon />{name}</h1>
    )
}


export default Main;