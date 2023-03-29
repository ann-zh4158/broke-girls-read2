// scrapes website for image 

import * as cheerio from 'cheerio';
import axios from 'axios';

async function scrapeImg(koboURL:string):Promise<string | unknown> {

    // DEFAULT = SCRAPE KOBO FOR COVER IMAGE 
        // RETURNS IMG SRC AS A FIELD TO BE STORED IN IMG COLUMN IN DB

    try {
        const { data:htmlPage } = await axios.get(koboURL);     
        const $ = await cheerio.load(htmlPage);
        const src = $('.cover-image.notranslate_alt.book-image');  // finds all classes of this tag 

        if (src.length > 1) {
            throw new Error('you are not selecting a unique DOM el');
        }

        return src.attr('src'); 

    } catch (err) {
        console.error(err);
        return `there is an error in image scraper: ${err}`;
    }

}

// scrapeImg('https://www.kobo.com/us/en/ebook/the-devotion-of-suspect-x-1')
//     .then(res => {
//         console.log(typeof res); // returns type = string
//     })
//     .catch(err => {console.error(err);});

export default scrapeImg;