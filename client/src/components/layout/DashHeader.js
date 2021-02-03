import React from 'react';
import './DashHeader.css';
import {ReactComponent as MCLogo} from '../../imgs/header-red-logo.svg';
import ConnectWallet from "./ConnectWallet";
import Rules from "../Rules";


const DashHeader = () => {
    return (
        <div className="DashHeader">
            <a href="/">
                <MCLogo className="logo-img" width="52" height="52"/>
            </a>
            <a href="/" style={{fontSize: '32px', marginLeft: '14px', textDecoration: "none", color: "white"}}>
                Mount Carlo
            </a>
            <div style={{flexGrow: 1}}/>
            <Rules/>
            <ConnectWallet/>
        </div>
    );
};

export default DashHeader;
