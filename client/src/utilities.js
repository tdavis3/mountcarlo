export const NETWORK_ID = '4';  // Rinkeby

// This is an error code that indicates that the user canceled a transaction
export const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// Convert unix to local date string rep
export function convertFromUnix(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
}

// Convert wei to eth
export function weiToEth(wei) {
    return wei * 10e-18;
}
