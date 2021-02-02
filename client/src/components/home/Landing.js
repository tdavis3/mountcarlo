import React from 'react';
import './Landing.css';
import {Button} from "rebass";
import {useHistory} from "react-router-dom";
import {NETWORK_ID} from "../../utilities";

const Landing = () => {

    let history = useHistory();

    const enter = () => {
        if (checkNetwork()) {
            return history.push("/dashboard");
        }
        // TODO: Display modal to connect to correct network
    };

    // This method checks if Metamask is connected to the correct network
    const checkNetwork = () => {
        if (window.ethereum.networkVersion === NETWORK_ID) {
            return true;
        }
        // setContractState(prevState => {
        //     return {...prevState, networkError: 'First, connect Metamask to correct network'};
        // });
        return false;
    }

    return (
        <div className="Landing">
            <div className="landing-header">
                <h1 className="landing-header-text">
                    Mount Carlo
                </h1>
            </div>
            <h1 className="landing-subtext">
                The (re)birth of a decentralized crypto lottery.
            </h1>
            <Button className="button-outline" sx={{fontSize: 30, padding: 14}} onClick={enter}>
                Enter
            </Button>
        </div>
    );
}

export default Landing;
