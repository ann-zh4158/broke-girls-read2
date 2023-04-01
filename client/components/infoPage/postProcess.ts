// helper functions that post-process data before plotting
import ReshapedData from './reshapedData';
import PriceData from './priceData';

function toMinutes(time:string):number {
    // converts from JS Date.now [ms] to [mins]
    const now = Date.now(); // save the time stamp
    return Math.floor((now - Number(time)) / 1000 / 60);
}

function findMinMax(arr:number[]):number[] {
    // might be faster to cache max / mins in a database of some sort
    // might be easier using a different type of data structure
    // for now, this will do
    
    let min = arr[0];
    let max = arr[0]; 
    for (let i = 1; i < arr.length; i++) {
        min = (arr[i] < min) ? arr[i] : min;
        max = (arr[i] > max) ? arr[i] : max; 
    }

    return [min, max];

}

function postProcess(queriedRes:PriceData, dataSets = 2, timeScl = ''):ReshapedData {
    // post-process the data received from getPrices 
    // parameter dataSets can be made dynamic should the need arise later
        // defaults to 2 for now (we know kobo and nook scrapers are valid)
    // ideally, we want to determine what time scale we want our information to be represented in [mins, seconds, hrs, etc] 
        // bc we're not tracking this over a long period of time continuously, [mins] is sufficient for now   

    // assuming we can scrape Amazon again --> 3 fields inside input obj
        // kindle, nook, kobo --> destructure by keys 

    const { nook, kobo } = queriedRes; // destructure --> these are now arrays
    const times = [];
    const nookPrices = [];
    const koboPrices = []; 

    try {
        for (let i = 0; i < nook.length; i++) {
            // these are time series --> their lengths MUST BE THE SAME 

            if (timeScl === 'mins') times.push(toMinutes(nook[i].time));
            else times.push(Number(nook[i].time));

            nookPrices.push(Number(nook[i].price));
            koboPrices.push(Number(kobo[i].price));  
        }  
        
    } catch (err) {
        console.error(`Error in post processing time series: ${err}`);
    }

    // compute min / maxes ---> for larger sets of data, we need to consider more performant alternatives
    const suprems = findMinMax(nookPrices.concat(koboPrices));

    return {times:times, nookPrices:nookPrices, koboPrices:koboPrices, min:suprems[0], max:suprems[1]};

}

export default postProcess;