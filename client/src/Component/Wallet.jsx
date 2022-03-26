import React, { useState, useEffect } from "react";
import styles from "../Styles/Wallet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiCopy } from 'react-icons/bi';
import { IoWalletOutline, IoWallet } from 'react-icons/io5';
import { GoLinkExternal } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCaretUp } from 'react-icons/ai';
import { MdAccountBalanceWallet,  MdOutlineAccountBalanceWallet} from 'react-icons/md';
import { setIsAuth, setWallet, setWalletModal } from "../Redux/app/actions"
import { ethers } from "ethers";
import { abi } from "../helper";

const Wallet = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        isAuth,
        wallet,
        walletModal
    } = useSelector(state => state.app)


    const connectWallet = async () => {
        dispatch(setWalletModal(false))

        let walletObj = { "name": "MetaMask" }
        walletObj.accounts = await metamask.requestAccounts()
        walletObj.balance = await metamask.getBalance()
        walletObj.network = await metamask.chainId()
        walletObj.isConnected = await metamask.isConnected()

        dispatch(setWallet(walletObj));
        dispatch(setIsAuth(true))
    }

    const disconnectWallet = () => {
        dispatch(setWalletModal(false))
        dispatch(setWallet({}))
        dispatch(setIsAuth(false))
    }

    const handleWalletConnect = () => {
        if (window.ethereum) {
            dispatch(setWalletModal(!walletModal))
        } else {
            alert("install metamask extension!!")
        }
    }

    

    // const check = async () => {
    //     console.log("check called");
    //     window.ethereum.request({ method: 'eth_requestAccounts' })
    //     const ethersProvider = new ethers.providers.Web3Provider(window.ethereum, "any");
    //     let mySigner = ethersProvider.getSigner();

    //     let contractObj = new ethers.Contract(
    //         process.env.REACT_APP_CONTRACT_ADDRESS,
    //         abi,
    //         mySigner
    //     );

    //     const name = await contractObj.getName()
    //     console.log(name);

    //     // await contractObj.setName("Akash")

    //     const name2 = await contractObj.getName()
    //     console.log(name2);
    // }
    
    const metamask = {
        requestAccounts: async () => {
            let accountArr = window.ethereum.request({ method: 'eth_requestAccounts' })
            return accountArr;
        },
        getBalance: async (para = 0) => {
            let acc = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let _balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [acc[para], 'latest']
            })

            return ethers.utils.formatEther(_balance)
        },
        chainId: async () => {
            let chainHex = window.ethereum.request({ method: 'eth_chainId' })
            return chainHex;
        },
        isConnected: async () => {
            let connectStatus = window.ethereum.isConnected()
            return connectStatus;
        }
    }

    const networkObj = {
        "0x1": "MainNet",
        "0x3": "Ropsten",
        "0x4": "Rinkeby",
        "0x42": "Kovan"
    }

    const addressString = () => {
        let adr = wallet.accounts[0].split("")
        let start = adr.slice(0, 3).join("")
        let end = adr.slice(-4).join("")
        let string = `${start}...${end}`
        return string;
    }

    return (
        <div className={styles.wrapper} >
            <label
                className={styles.walletWrapper}
                onClick={
                    () => handleWalletConnect()
                }
            >
                <MdAccountBalanceWallet className={isAuth === true ? styles.walletIconOrange : styles.walletIcon} />
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
                style={{ visibility: walletModal === false && "hidden" }}
                className={styles.caretIcon}
                onClick={() => dispatch(setWalletModal(false))}
            />
            {
                walletModal === true && isAuth === true ?
                    <div className={styles.walletModal}>
                        <FaUserCircle className={styles.walletUser} />
                        <div className={styles.walletAddressDiv}>
                            <p className={styles.walletModalText}>ETH: {addressString()}</p>
                            <BiCopy className={styles.walletModalIcon} onClick={() =>  navigator.clipboard.writeText(wallet.accounts[0])}/>
                            <GoLinkExternal className={styles.walletModalIcon} onClick={() => window.open(`https://rinkeby.etherscan.io/address/${wallet.accounts[0]}`, '_blank')}/>
                        </div>
                        <div className={styles.walletDataDiv}>
                            <p className={styles.walletModalText}>Wallet</p>
                            <label className={styles.walletName}>
                                <IoWalletOutline className={styles.walletModalIcon} style={{ cursor: "auto", margin: 0 }} />
                                <p className={styles.walletModalText}>{wallet.name}</p>
                            </label>
                        </div>
                        <div className={styles.walletDataDiv}>
                            <p className={styles.walletModalText}>Network</p>
                            <p className={styles.walletModalText}>{networkObj[wallet.network]}</p>
                        </div>
                        <div className={styles.walletButtonDiv}>
                            <label className={styles.walletSwitchButton} onClick={() => connectWallet()}>Change</label>
                            <label className={styles.walletDisconnectButton} onClick={() => disconnectWallet()}>Disconnect</label>
                        </div>
                    </div> : null
            }
            {
                walletModal === true && isAuth === false ?
                    <div className={styles.walletModal}>
                        <label className={styles.walletConnectButton} onClick={() => connectWallet()}>Connect</label>
                    </div> : null
            }
        </div>
    );
};

export { Wallet };
