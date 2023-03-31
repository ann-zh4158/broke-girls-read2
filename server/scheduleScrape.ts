// runs the scheduled task of scraping the web and updating prices every X units of time
    // GET all entries from main table
        // destructure the following: _id, nook_url, kobo_url, kindle_url
    // LOOP thru all main table entries 
        // invoke web scraper function
    // POST request to DB with new time series data 

import { AsyncTask } from 'toad-scheduler';
import db from './models/bookshelfModel';
import scrapePrice from '../web scrapers/scrapePrice';
import proxies from '../web scrapers/proxies';  // an array of proxies 

const proxLen = proxies.length; 
// const proxObj = proxies[Math.floor(Math.random() * proxLen)];  // randomly rotate a proxy on every request 

const scheduleScrape = new AsyncTask('get new prices', 
    () => {
        // a big fat promise chain here
        // FIRST --> GET ALL entries from MAIN table
        const getAll = `SELECT * FROM bookshelf`;
        return db.query(getAll, [])
            .then((result) => {
                // array of table entries
                // console.log('bookshelf: ',result.rows);
                for (let i = 0; i < result.rows.length; i++) {
                    // loop thru all books from main table --> destructure --> rename if necessary --> push
                    const { book_id:_id, nook_url:nook, kindle_url: kindle, kobo_url:kobo } = result.rows[i];

                    // MUST STAY INSIDE FOR-LOOP: randomly rotate a proxy on EACH request
                    const proxObj = proxies[Math.floor(Math.random() * proxLen)];   

                    // scrape the web for prices --> update db
                    // SCRAPE NOOK ! 
                    scrapePrice(nook, 'nook', proxObj)
                        .then((nookRes) => {
                            return Number(nookRes.trim().replace('$',''));  // gets rid of $, turns into number
                        })
                        .then((price) => {
                            const sqlStr = `INSERT INTO nook
                            (time, price, nook_id)
                            VALUES ($1, $2, $3);`;
                            db.query(sqlStr, [Math.floor(Date.now() / 1000 / 60), price, _id]);
                        });

                    // SCRAPE KOBO !    
                    scrapePrice(kobo, 'kobo', proxObj)
                        .then((koboRes) => {
                            return Number(koboRes.trim().replace('$',''));  // gets rid of $, turns into number
                        })
                        .then((price) => {
                            const sqlStr = `INSERT INTO kobo
                            (time, price, kobo_id)
                            VALUES ($1, $2, $3);`;
                            db.query(sqlStr, [Math.floor(Date.now() / 1000 / 60), price, _id]);
                        });  
                    
                    // // SCRAPE KINDLE !    
                    // scrapePrice(kindle, 'kindle', proxObj)
                    //     .then((kindleRes) => {
                    //         return Number(kindleRes.trim().replace('$',''));  // gets rid of $, turns into number
                    //     })
                    //     .then((price) => {
                    //         const sqlStr = `INSERT INTO kindle
                    //         (time, price, kindle_id)
                    //         VALUES ($1, $2, $3);`;
                    //         db.query(sqlStr, [Math.floor(Date.now() / 1000 / 60), price, _id]);
                    //     });                     
                    }
            });
    },
    (err: Error) => {
        // handle exceptions here
        console.error(`An error has occurred running your background task: ${err}`);
    }

); 


export default scheduleScrape; 
