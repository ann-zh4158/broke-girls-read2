// set up some dummy data to test backend
const dummyData = {
    title: "The Devotion of Suspect X",
    author: "Keigo Higashino",
    kindle_url: "https://www.amazon.com/Devotion-Suspect-Detective-Galileo-Novel-ebook/dp/B0044781ZQ/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=", 
    kobo_url: "https://www.kobo.com/us/en/ebook/the-devotion-of-suspect-x-1",
    nook_url: "https://www.barnesandnoble.com/w/devotion-of-suspect-x-keigo-higashino/1100337740?ean=9781429992312"
};

// import types
import { Request, Response, NextFunction} from 'express';
import db from '../models/bookshelfModel';

const bookController = {

    // get all books (TEST MODE)
    getBooks: (_req:Request, res:Response, next:NextFunction):unknown => {
        // console.log('inside getBooks');
        res.locals.flag = 'success';
        res.locals.bookInfo = dummyData; 
        return next(); 
    },

    addBooks: async (req:Request, res:Response, next:NextFunction):Promise<unknown> => {
        // clicking the add button will send a request to add entry 
        // user inputs inside req.body
        // req body should match properties on bookshelf model in db

        console.log('inside addBook');

        const { title, author, nook_url, kindle_url, kobo_url } = req.body;
        console.log('req body is: ', req.body);
        const bookEntry = [title, author, nook_url, kindle_url, kobo_url];
        try {
            const sqlStr = `INSERT INTO bookshelf
            (title, author, nook_url, kindle_url, kobo_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`;
            const queryRes = await db.query(sqlStr, bookEntry);
            res.locals.newBook = queryRes.rows[0];
            console.log('queryRes is: ',queryRes);
            return next();
        } catch (err) {
            next({log: 'Error in bookController.addBook', message: err});
            return res.status(400).end();
        }
    },

};


export default bookController;