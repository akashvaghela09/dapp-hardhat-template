import React, { useState, useEffect } from "react";
import styles from "../Styles/Wallet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Onboard from "bnc-onboard";
import WEB3 from "web3";
import { BsWallet2 } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';
import { IoWalletOutline } from 'react-icons/io5';
import { GoLinkExternal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCaretUp } from 'react-icons/ai';
import { setIsAuth } from "../Redux/app/actions"

const Wallet = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    let web3;

    const {
        isAuth
    } = useSelector(state => state.app)

    const [modalState, setModalState] = useState(false);

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

    const connectWallet = async () => {
        await setModalState(false)
        await onboard.walletSelect();
        await onboard.walletCheck()
        getWalletData()
        let auth = await check()
        dispatch(setIsAuth(auth))
    }

    const check = async () => {
        try {
            const readyToTransact = await onboard.walletCheck()
            if(readyToTransact === true){
                console.log(readyToTransact)
                return true
            }
        } catch {
            console.log(false);
            return false
        }
    }

    const disconnectWallet = async () => {
        await setModalState(false)
        await onboard.walletReset()
        let auth = await check()
        dispatch(setIsAuth(auth))
    }

    const getWalletData = () => {
        const currentState = onboard.getState()
        console.log(currentState);
        // {
        //    address: string
        //    network: number
        //    balance: string
        //    wallet: Wallet
        //    mobileDevice: boolean
        //    appNetworkId: number
        // }
    }

    const handleWalletConnect = () => {
        console.log("handle wallet");
        console.log("modal", modalState);
        console.log("isAuth", isAuth);
        setModalState(!modalState)
    }

    return (
        <div className={styles.wrapper}>
            <label className={styles.walletWrapper} onClick={() => handleWalletConnect()}>
                <BsWallet2 className={styles.walletIcon} />
                <div className={isAuth === true ? styles.walletBadgeGreen : styles.walletBadge} />
            </label>
            {
                isAuth === true ?
                    <label className={styles.walletStatus} onClick={() => handleWalletConnect()}>
                        <p className={styles.walletText1}>Connected</p>
                        <p className={styles.walletText2}>Disconnect Your Wallet</p>
                    </label>
                    :
                    <label className={styles.walletStatus} onClick={() => handleWalletConnect()}>
                        <p className={styles.walletText1}>Not Connected</p>
                        <p className={styles.walletText2} style={{ color: "#ff6b6b" }}>Connect Your Wallet</p>
                    </label>
            }
            <AiFillCaretUp
                style={{visibility: modalState === false && "hidden"}}
                className={styles.caretIcon}
                onClick={() => setModalState(false)} 
                />

            {/* <button onClick={login}>Login</button>
            <button onClick={check}>Check</button>
            <button onClick={reset}>Reset</button> */}
            {
                modalState === true && isAuth === true &&
                <div className={styles.walletModal}>
                    <FaUserCircle className={styles.walletUser} />
                    <div className={styles.walletAddressDiv}>
                        <p className={styles.walletModalText}>ETH: 0x90f9...sd8f</p>
                        <BiCopy className={styles.walletModalIcon} />
                        <GoLinkExternal className={styles.walletModalIcon} />
                    </div>
                    <div className={styles.walletDataDiv}>
                        <p className={styles.walletModalText}>Wallet</p>
                        <label className={styles.walletName}>
                            <IoWalletOutline className={styles.walletModalIcon} style={{ cursor: "auto", margin: 0 }} />
                            <p className={styles.walletModalText}>MetaMask</p>
                        </label>
                    </div>
                    <div className={styles.walletDataDiv}>
                        <p className={styles.walletModalText}>Network</p>
                        <p className={styles.walletModalText}>Rinkeby</p>
                    </div>
                    <label className={styles.walletDisconnectButton} onClick={() => disconnectWallet()}>Disconnect</label>
                </div>
            }
            {
                modalState === true && isAuth === false &&
                <div className={styles.walletModal}>
                    <label className={styles.walletConnectButton} onClick={() => connectWallet()}>Connect</label>
                </div>
            }
        </div>
    );
};

export { Wallet };
