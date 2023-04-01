interface ReshapedData {
    times: number[],
    nookPrices?: number[],
    koboPrices?: number[],
    kindlePrices?: number[],
    max: number,
    min: number
}

// times is a REQUIRED field (this is a time series, so ofc!)
// other fields are OPTIONAL bc they may not always be needed
// EVERYTHING is organized in the form of an array of numerical values

export default ReshapedData; 