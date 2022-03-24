import React, { useEffect } from "react";
import styles from "../Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation();


    return (
        <div className={styles.wrapper}>
         Home Page
        </div>
    );
};

export { Home };
