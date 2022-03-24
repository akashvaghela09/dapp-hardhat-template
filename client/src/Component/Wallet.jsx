import React, { useEffect } from "react";
import styles from "../Styles/Wallet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Onboard from "bnc-onboard";
import WEB3 from "web3";

const Wallet = () => {
    const dispatch = useDispatch();
    const location = useLocation();
  
    let web3;

    const onboard = Onboard({
        dappId: process.env.REACT_APP_ONBOARD_KEY,
        networkId: 4,
        darkMode: true,
        subscriptions: {
            wallet: wallet => {
                web3 = new WEB3(wallet.provider);
                console.log(`${wallet.name} is now connected`);
            }
        },
        walletSelect: {
            wallets: [
                {
                    walletName: "metamask",
                    preferred: true
                },
                {
                    walletName: "fortmatic",
                    apiKey: process.env.REACT_APP_FORTMATIC_API_KEY,
                    preferred: true
                },
                {
                    walletName: "coinbase",
                    preferred: true
                },
                {
                    walletName: "trust"
                },
                {
                    walletName: "walletConnect",
                    infuraKey: process.env.REACT_APP_INFURA_ID
                },
                {
                    walletName: "portis",
                    apiKey: process.env.REACT_APP_PORTIS_API_KEY
                },
                {
                    walletName: "authereum"
                },
                {
                    walletName: "ledger"
                }
            ]
        }
    })

    const login = async () => {
        await onboard.walletSelect();
        await onboard.walletCheck()
    }

    const check = async () => {
        try {
            const readyToTransact = await onboard.walletCheck()
            console.log(readyToTransact)
        } catch {
            console.log(false);
            return false
        }
    }

    const reset = async () => {
        await onboard.walletReset()
    }

    return (
        <div className={styles.wrapper}>
            Wallet Page
            <button onClick={login}>Login</button>
            <button onClick={check}>Check</button>
            <button onClick={reset}>Reset</button>
        </div>
    );
};

export { Wallet };
