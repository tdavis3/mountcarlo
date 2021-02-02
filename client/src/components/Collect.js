import React, {useState} from 'react';
import './Collect.css';
import {Button} from 'rebass';
import Loading from "./Loading";
import {connect} from "react-redux";
import {ERROR_CODE_TX_REJECTED_BY_USER} from "../utilities";


const Collect = ({metaData, contractData}) => {

    const [collectTxLoading, setCollectTxLoading] = useState(false);

    /**
     * Attempts to drain the funds from the Mount Carlo contract
     */
    const collect = async () => {
        try {
            setCollectTxLoading(true);
            const collectTx = await metaData.contract.collect();
            const receipt = await collectTx.wait();
            if (receipt.status === 0) {
                console.log("An error occurred when attempting to collect. Try again.");
            }
            setCollectTxLoading(false);
        } catch (error) {
            setCollectTxLoading(false);
            // If the user rejected tx, then do nothing
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                return;
            }
        }
    }

    return (
        <div className="Collect">
            {
                !contractData.data.gameOver && (
                    <div>
                        <p className="collect-helper-text">Attempt to drain the contract :)</p>
                        <Button onClick={collect} disabled={contractData.data.gameOver}>Collect</Button>
                        {collectTxLoading && (<Loading/>)}
                    </div>
                )
            }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        metaData: state.metaData,
        contractData: state.contractData
    }
}

export default connect(mapStateToProps, null)(Collect);
