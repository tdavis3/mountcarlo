import React from 'react';
import './DashHeader.css';
import {ReactComponent as MCLogo} from '../../imgs/header-red-logo.svg';
import {Link, Heading} from "rebass";
import ConnectWallet from "../ConnectWallet";


const DashHeader = () => {
    return (
        <div className="DashHeader">
            <a href="/">
                <MCLogo className="logo-img" width="52" height="52"/>
            </a>
            <Heading as="a" fontSize={[ 4, 5 ]} href="/" sx={{marginLeft: '12px', textDecoration: "none", color: "white"}}>
                Mount Carlo
            </Heading>
            <div style={{flexGrow: 1}}/>
            <Link variant='nav' href="/rules">Rules</Link>
            <ConnectWallet/>
        </div>
    );
};

export default DashHeader;
