interface TimeData {
    time: string,
    price: string
}

interface PriceData {
    // structure based on output of json data in server response from getPrice
    nook: TimeData[],
    kobo: TimeData[],
    kindle?: TimeData[]  // we currently don't have kindle, so this is going to be optional
}

export default PriceData;