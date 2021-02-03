import React from 'react';
import './Header.css';
import {ReactComponent as MCLogo} from '../../imgs/header-red-logo.svg';
import ConnectWallet from "./ConnectWallet";


const Header = () => {
    return (
        <div className="Header">
            <a href="/">
                <MCLogo className="logo-img" width="75" height="75"/>
            </a>
            <div style={{flexGrow: 1}}/>
            <ConnectWallet/>
        </div>
    );
};

export default Header;
