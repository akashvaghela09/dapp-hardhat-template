import React from 'react';
import styles from '../Styles/Header.module.css'
import {Link, useLocation} from "react-router-dom";


const Header = () => {
    const location = useLocation();

    return (
        <div className={styles.wrapper}>
             
            <div className={styles.section1}>
                <Link to="/" className={location.pathname === "/" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>MultiSign</p>
                </Link> 
            </div> 
            <div className={styles.section2}>
                <Link to="/dashboard" className={location.pathname === "/dashboard" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>Dashboard</p>
                </Link> 
                <Link to="/contact-me" className={location.pathname === "/contact-me" ? styles.activeLink : styles.link}>
                    <p className={styles.pageName}>Contact Me</p>
                </Link> 
            </div> 
        </div>
    )
}

export { Header }