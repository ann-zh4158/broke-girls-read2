// import types
import { Request, Response, NextFunction} from 'express';
import db from '../models/bookshelfModel';
import scrapeImg from '../../web scrapers/scrapeImg';

const bookController = {

    // get ALL books
    getBooks: async (_req:Request, res:Response, next:NextFunction):Promise<unknown> => {

        const sqlStr = `SELECT * FROM bookshelf`;

        try {
            const queryRes = await db.query(sqlStr, []);
            res.locals.bookInfo = queryRes.rows;
            return next();
        } catch (err) {
            return next({log: 'Error in bookController.getBooks', message: err}); 
        }

    },

    addBooks: async (req:Request, res:Response, next:NextFunction):Promise<unknown> => {
        // clicking the add button will send a request to add entry 
        // user inputs inside req.body
        // req body should match properties on bookshelf model in db

        const { title, author, nook_url, kindle_url, kobo_url } = req.body;
        const bookEntry = [title, author, nook_url, kindle_url, kobo_url];
        try {
            // first scrape KOBO URL for cover image of new book
                // return that img src as a link 
                // push field to end of bookEntry array --> THEN post to database
            const img_src = await scrapeImg(kobo_url);    
            bookEntry.push(img_src);

            const sqlStr = `INSERT INTO bookshelf
            (title, author, nook_url, kindle_url, kobo_url, img)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;`;
            const queryRes = await db.query(sqlStr, bookEntry);
            res.locals.newBook = queryRes.rows[0]; // console.log('new book added: ',res.locals.newBook);
            return next();

        } catch (err) {
            return next({log: 'Error in bookController.addBooks', message: err});
        }
    },

    updateBooks: async (req:Request, res:Response, next:NextFunction):Promise<unknown> => {
        
        //you're only allowed to update the links (in case they break at some point in time) 
        // allowed to only change one link at a time
        const { title, nook_url, kindle_url, kobo_url } = req.body; 

        // console.log('put req body looks like this: ', req.body);

        const editBook = [title]; 
        let sqlStr = '';
        let newURL = false;  // default value
        try {
            // both null and undefined are falsy in TS / JS
            // JSON'd req.body stores these properties as strings
            if (nook_url !== 'undefined' && nook_url !== '') {

                editBook.push(nook_url);
                sqlStr = `UPDATE bookshelf
                SET nook_url = $2
                WHERE title = $1;`;
                newURL = true; 

            } else if (kobo_url !== 'undefined' && kobo_url !== '') {

                editBook.push(kobo_url);
                sqlStr = `UPDATE bookshelf
                SET kobo_url = $2
                WHERE title = $1;`;
                newURL = true; 

            } else if (kindle_url !== 'undefined' && kindle_url !== '') {

                editBook.push(kindle_url);
                sqlStr = `UPDATE bookshelf
                SET kindle_url = $2
                WHERE title = $1;`;
                newURL = true; 

            } else {
                // invalid request body --> assumed no change
                res.locals.edited = null; 
            }

            if (newURL) {
                const queryRes = await db.query(sqlStr, editBook);
                res.locals.edited = queryRes.rows[0];
            }    
            return next();

        } catch (err) {
            return next({log: 'Error in bookController.updateBooks', message: err});
        }
    }, 

    deleteBooks: async (req:Request, res:Response, next:NextFunction):Promise<unknown> => {

        // user chooses to "unwatch" existing entry --> delete row from table 
        const { id } = req.body;  // identify what to be delted thru title + author
        const toBeDeleted = [id];
        const sqlStr = `DELETE FROM bookshelf
        WHERE book_id = $1;`;
        try {
            const queryRes = await db.query(sqlStr, toBeDeleted);
            res.locals.deleted = queryRes.rows[0];
            return next();
        } catch (err) {
            return next({log: 'Error in bookController.deleteBooks', message: err});            
        }

    },

};


export default bookController;