// scrapes the web for product prices

import * as cheerio from 'cheerio';
import axios from 'axios';

async function scrapePrice(targetURL:string, urlFlag:string, proxObj:object):Promise<string> {
    // input = url, flag [strings] 
        // output val (wrapped in promise) = price (in USD) of the item on the URL [string]
            // async funcs --> always return a promise --> correct type: Promse<string>
        // recall that in postgresql --> this column MUST be a number 
    
    // a flag to indicate which eBook store URL is being parsed 

    try {
        const { data:htmlPage } = await axios.get(targetURL, proxObj);     
        const $ = await cheerio.load(htmlPage);
        let priceTag = $('div');  // some placeholder (finds all divs on page)

        // let priceTag = {};  
        switch (urlFlag) {
            case 'kobo':
                priceTag = $('[data-price*="$"]');  // get all elements with attribute "data-price" containing value "$"
                break;
            case 'kindle':
                priceTag = $('#kindle-price');  // get all elements with id "kindle-price"
                break;
            case 'nook':
                // get all spans with className = "format price" that are descendants of els with classNames containing value "selected-format-chiclet"
                    // whitespace (' ') directs selector to look for descendants
                priceTag = $('[class*="selected-format-chiclet"] span.format-price'); 
                break;

        }    
        
        // extra checks to ensure uniqueness of selected element
        if (priceTag.length > 1) {
            throw new Error('you are not selecting a unique element from the DOM');
        } 

        return priceTag.text();  // return text content of selected el

    } catch (err) {
        console.error(err);
        return `there is an error in price scraper: ${err}`;
    }


}


// // how to use the above function -----------------------------
// /* const scrapeRes = */ scrapeKindle()
//     .then(result => {console.log(result.trim());})
//         .catch(err => {console.error(err);});

// console.log(scrapeRes);

export default scrapePrice;