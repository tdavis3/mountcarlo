import React from 'react';
import './Header.css';
import {ReactComponent as ReactLogo} from '../../imgs/header-red-logo.svg';


const Header = () => {
    return (
        <div className="Header">
            <a href="/">
                <ReactLogo className="logo-img" width="50" height="50"/>
            </a>
            <h1 className="logo-text">Mount Carlo</h1>
        </div>
    );
};

export default Header;
