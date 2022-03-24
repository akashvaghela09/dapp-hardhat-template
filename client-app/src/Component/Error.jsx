import React, { useEffect } from "react";
import styles from "../Styles/Error.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Error = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    return (
        <div className={styles.wrapper}>
            Error Page
        </div>
    );
};

export { Error };
