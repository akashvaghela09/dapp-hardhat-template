import React from 'react';
import styles from '../Styles/Header.module.css'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiWallet } from 'react-icons/bi';
import { BsQuestionCircle, BsGithub } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';

const Header = () => {
    const location = useLocation();
    let navigate = useNavigate();
    let path = location.pathname;
    const handleRoute = (para) => {
        navigate(`/${para}`)
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.pageLinkContainer}>
                <label className={path === "/" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("")} >HomeHomeHomeHomeHome</label>
                <div className={styles.routeContainer}>
                    <label className={path === "/dashboard" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("dashboard")} >Dashboard</label>
                    <label className={path === "/contact-me" ? styles.activeLink : styles.pageLink} onClick={() => handleRoute("contact-me")} >Contact</label>
                </div>
            </div>
            <label className={styles.pageLink} onClick={() => handleRoute("dashboard")}></label>


            <div className={styles.bottomWrapper}>
                <label className={styles.iconWrapper}>
                    <AiOutlineHome 
                        className={path === "/" ? styles.activeLinkIcon : styles.pageIcon} 
                        onClick={() => handleRoute("")} 
                    />
                    <p>Home</p>
                </label>
                <label className={styles.iconWrapper}>
                    <MdOutlineDashboard 
                        className={path === "/dashboard" ? styles.activeLinkIcon : styles.pageIcon} 
                        onClick={() => handleRoute("dashboard")} 
                    />
                    <p>Dashboard</p>
                </label>
                <label className={styles.iconWrapper}>
                    <BsQuestionCircle 
                        className={path === "/contact-me" ? styles.activeLinkIcon : styles.pageIcon} 
                        onClick={() => handleRoute("contact-me")} 
                    />
                    <p>Contact Me</p>
                </label>
                <label className={styles.iconWrapper}>
                    <BsGithub className={path === "/github" ? styles.activeLinkIcon : styles.pageIcon} />
                    <p>GitHub</p>
                </label>
            </div>
        </div>
    )
}

export { Header }