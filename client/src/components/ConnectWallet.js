import React from "react";
import {Button} from 'rebass';
import Loading from "./Loading";
import NetworkErrorMessage from "./errors/NetworkErrorMessage";
import './ConnectWallet.css';


export default function ConnectWallet({connectWallet, networkError, dismiss, loading}) {
    return (
        <div className="ConnectWallet">
            <div className="connect-wallet">
                <p>Please connect your wallet to the Rinkeby Test network.</p>
                <Button
                    style={{margin: '1.5vmin'}}
                    onClick={connectWallet}
                >
                    Connect
                </Button>
            </div>
            {/* Metamask network should be set to Localhost:8545. */}
            {networkError && (
                <NetworkErrorMessage
                    message={networkError}
                    dismiss={dismiss}
                />
            )}
            {loading && (<Loading/>)}
        </div>
    );
}
