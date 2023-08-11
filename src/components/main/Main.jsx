import React from 'react';
import styles from './Main.module.css'

// this is going to have props 

const Main = ({page}) => {
    return (
        <h1 className={styles.main }>{page}</h1>
    )
}


export default Main;