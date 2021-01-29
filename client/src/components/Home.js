import React, {useRef, useEffect, useState} from 'react';
import {ethers} from "ethers";
import contractAddress from "../contracts/contract-address.json";
import MCArtifact from "../contracts/MountCarlo.json";
import NoWalletDetected from "./errors/NoWalletDetected";
import ConnectWallet from "./ConnectWallet";
import Stats from "./Stats";
import BiddingTable from "./BiddingTable";
import Collect from "./Collect";
import './Home.css';


// A list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
// to use when deploying to other networks.
const NETWORK_ID = '4';  // Rinkeby

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;


const Home = () => {

    let _provider, mcContract;

    const pollDataInterval = useRef(0);

    useEffect(() => {
        return () => _stopPollingData();
    }, []);

    const defaultState = {
        contractAddress: undefined,
        delay: undefined,
        selectedAddress: undefined,  // the user's address and balance
        balance: undefined,
        inception: undefined,
        gameOver: undefined,
        latestBid: undefined,
        timeElapsed: undefined,
        networkError: undefined,
    };

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    const [contractState, setContractState] = useState(defaultState);

    const [contract, setContract] = useState({});
    const [transactions, setTransactions] = useState({});

    const _connectWallet = async () => {
        // This method is run when the user clicks the Connect. It connects the
        // dapp to the user's wallet, and initializes it.

        // To connect to the user's wallet
        const [selectedAddress] = await window.ethereum.request({method: 'eth_requestAccounts'});

        // Once we have the address, we can initialize the application.

        // Check the network matches
        if (!_checkNetwork()) {
            return;
        }

        _initialize(selectedAddress);

        // We reinitialize it whenever the user changes their account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            console.log("Accounts changed!");
            _stopPollingData();
            // `accountsChanged` event can be triggered with an undefined newAddress.
            // This happens when the user removes the Dapp from the "Connected
            // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
            // To avoid errors, we reset the dapp state
            if (newAddress === undefined) {
                return _resetState();
            }
            _initialize(newAddress);
        });

        // We reset the dapp state if the network is changed
        window.ethereum.on("chainChanged", (_chainId) => {
            _stopPollingData();
            _resetState();
        });
    }

    /**
     * Initialize the Dapp
     * @param userAddress - address of the user
     */
    const _initialize = userAddress => {
        // We first store the user's address in the component's state
        setContractState(prevState => {
            return {...prevState, selectedAddress: userAddress};
        });
        _intializeEthers();
        getMCData();
        _startPollingData();
    }

    /**
     * Initialize the Mount Carlo contract
     */
    const _intializeEthers = async () => {
        // We first initialize ethers by creating a provider using window.ethereum
        _provider = new ethers.providers.Web3Provider(window.ethereum);
        mcContract = new ethers.Contract(
            contractAddress.MountCarlo,
            MCArtifact.abi,
            _provider.getSigner(0)
        );
        setContract(mcContract);
    }

    // The next to methods are needed to start and stop polling data.
    const _startPollingData = () => {
        pollDataInterval.current = setInterval(getMCData, 1000);
        // Run it once immediately - don't have to wait for it
        getMCData();
    }

    const _stopPollingData = () => {
        clearInterval(pollDataInterval.current);
        pollDataInterval.current = 0;
    }

    /**
     * Read data from the Mount Carlo contract
     */
    const getMCData = async () => {
        const [delay, inception, gameOver, balance, latestBid, timeElapsed] = await Promise.all([
            mcContract.delay(),
            mcContract.inception(),
            mcContract.gameIsOver(),
            _provider.getBalance(mcContract.address),
            mcContract.latestBid(),
            mcContract.getTimeSinceLastBid()
        ]);
        const date = new Date(inception.toNumber() * 1000);
        // const delay = await mcContract.delay();
        // const inception = await mcContract.inception();
        // const date = new Date(inception.toNumber() * 1000);
        // const gameOver = await mcContract.gameIsOver();
        // const balance = await _provider.getBalance(mcContract.address);
        // const latestBid = await mcContract.latestBid();
        // const timeElapsed = await mcContract.getTimeSinceLastBid();
        setContractState(prevState => {
            return {
                ...prevState,
                contractAddress: contractAddress.MountCarlo,
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
            };
        });
    }

    /**
     * Sends bid to Mount Carlo contract
     * @param {String} bid
     */
    const sendBid = async (bid) => {
        try {
            setTransactions(prevState => {
                return {...prevState, bidTxLoading: true};
            });
            const bidTx = await contract.bid({value: ethers.utils.parseEther(bid)});  // Send the transaction
            const receipt = await bidTx.wait();  // Wait for the transaction to be mined
            if (receipt.status === 0) {
                // We can't know the exact error that make the transaction fail once it was
                // mined, so we throw this generic one.
                // TODO: Display an error message
                console.log("An error occurred when attempting to send a bid of: ", bid);
                // throw new Error("Bid transaction failed when sending a bid of: " + bid);
            }
            // At this point the tx was successful
            setTransactions(prevState => {
                return {...prevState, bidTxLoading: false};
            });
        } catch (error) {
            setTransactions(prevState => {
                return {...prevState, bidTxLoading: false};
            });
            // If the user rejected tx, then do nothing
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
            // TODO: Other errors should be logged and handled
        }
    }

    /**
     * Attempts to drain the funds from the Mount Carlo contract
     */
    const collect = async () => {
        try {
            setTransactions(prevState => {
                return {...prevState, collectTxLoading: true};
            });
            const collectTx = await contract.collect();
            const receipt = await collectTx.wait();
            if (receipt.status === 0) {
                console.log("An error occurred when attempting to collect. Try again.");
            }
            setTransactions(prevState => {
                return {...prevState, collectTxLoading: false};
            });
        } catch (error) {
            setTransactions(prevState => {
                return {...prevState, collectTxLoading: false};
            });
            // If the user rejected tx, then do nothing
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
        }
    }

    // This method just clears part of the state.
    function _dismissNetworkError() {
        setContractState(prevState => {
            return {...prevState, networkError: undefined};
        });
    }

    // This method resets the state
    function _resetState() {
        setContractState(defaultState);
        setTransactions({});
    }

    // This method checks if Metamask is connected to the correct network
    const _checkNetwork = () => {
        if (window.ethereum.networkVersion === NETWORK_ID) {
            return true;
        }
        setContractState(prevState => {
            return {...prevState, networkError: 'First, connect Metamask to correct network'};
        });
        return false;
    }

    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
        return <NoWalletDetected/>;
    }

    // If wallet has not been connected yet or data is loading from the contract
    if (!contractState.selectedAddress || (contractState.selectedAddress && !contractState.balance)) {
        return (
            <ConnectWallet
                connectWallet={_connectWallet}
                networkError={contractState.networkError}
                dismiss={_dismissNetworkError}
                loading={contractState.selectedAddress && !contractState.balance}
            />
        );
    }

    // If everything is loaded, we render the application.
    return (
        <div className="Home">
            <div className="main-view">
                <Stats
                    contractState={contractState}
                />
                <div className="divider"/>
                <div className="user-interaction-table">
                    <BiddingTable
                        sendBid={sendBid}
                        contractState={contractState}
                        loading={transactions.bidTxLoading}
                    />
                    <Collect
                        collectPrizePool={collect}
                        contractState={contractState}
                        loading={transactions.collectTxLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
