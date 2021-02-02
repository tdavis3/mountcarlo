import React, {useEffect} from 'react';
import NoWalletDetected from "./errors/NoWalletDetected";
import Stats from "./Stats";
import BiddingTable from "./BiddingTable";
import Collect from "./Collect";
import './Dashboard.css';
import {connect} from 'react-redux';
import {connectWallet, initializeContract, resetDapp} from "../redux/actions/metaData";
import Loading from "./Loading";
import {loadContractData} from "../redux/actions/contractData";


const Dashboard = ({initializeContract, loadContractData, metaData, contractData}) => {

    useEffect(() => {
        if (!metaData.initialized) {
            initializeContract();
        }
        if (metaData.contract && metaData.provider) {
            getMCData();
        }
    }, [metaData]);

    /**
     * Read data from the Mount Carlo contract
     */
    const getMCData = async () => {
        const [delay, inception, gameOver, balance, latestBid, timeElapsed] = await Promise.all([
            metaData.contract.delay(),
            metaData.contract.inception(),
            metaData.contract.gameIsOver(),
            metaData.provider.getBalance(metaData.contract.address),
            metaData.contract.latestBid(),
            metaData.contract.getTimeSinceLastBid()
        ]);
        const date = new Date(inception.toNumber() * 1000);
        loadContractData({
            delay: parseInt(delay),
            inception: date,
            balance: balance,
            gameOver: gameOver,
            latestBid: {
                bid: latestBid.bid,
                bidder: latestBid.bidder,
                timestamp: new Date(parseInt(latestBid.timestamp) * 1000)
            },
            timeElapsed: parseInt(timeElapsed)
        });
    }

    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
        return <NoWalletDetected/>;
    }

    // If data has not been loaded yet
    if (!contractData.data) {
        return <Loading/>;
    }

    // If everything is loaded, we render the application.
    return (
        <div className="Dashboard">
            <div className="main-view">
                <Stats/>
                {metaData.userAddress && (
                    <>
                        <div className="divider"/>
                        <div className="user-interaction-table">
                            <BiddingTable/>
                            <Collect/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        metaData: state.metaData,
        contractData: state.contractData
    }
}

export default connect(mapStateToProps,
    {
        connectWallet,
        initializeContract,
        loadContractData,
        resetDapp
    })(Dashboard);
