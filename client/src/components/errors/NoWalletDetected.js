import React from "react";
import './NoWalletDetected.css'


export default function NoWalletDetected() {
    return (
        <div className="NoWalletDetected">
            <p>No Ethereum wallet was detected.</p>
            <p>Please install {" "}
                <a
                    href="http://metamask.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MetaMask
                </a>
            </p>
        </div>
    );
}
