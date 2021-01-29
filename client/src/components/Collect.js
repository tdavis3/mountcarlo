import React, {useEffect} from 'react';
import './Collect.css';
import {Button} from 'rebass';
import Loading from "./Loading";


const Collect = ({contractState, collectPrizePool, loading}) => {

    useEffect(() => {
    }, [loading]);

    const collect = async () => {
        await collectPrizePool();
    };

    return (
        <div className="Collect">
            {
                !contractState.gameOver && (
                    <div>
                        <p className="collect-helper-text">Attempt to drain the contract :)</p>
                        <Button onClick={collect} disabled={contractState.gameOver}>Collect</Button>
                        {loading && (<Loading/>)}
                    </div>
                )
            }
        </div>
    );
}

export default Collect;
