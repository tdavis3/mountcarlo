import React from "react";
import {Button} from "rebass";
import '../ConnectWallet.css';


export default function NetworkErrorMessage({message, dismiss}) {
    return (
        <div className="alert" role="alert">
            <p className="error-message">{message}</p>
            <Button
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={dismiss}
            >
                <span aria-hidden="true">&times;</span>
            </Button>
        </div>
    );
}
