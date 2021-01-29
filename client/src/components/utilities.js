// Convert unix to local date string rep
export function convertFromUnix(unixTime) {
    const date =  new Date(unixTime * 1000);
    return date.toLocaleTimeString();
}

// Convert wei to eth
export function weiToEth(wei) {
    return wei * 10e-18;
}