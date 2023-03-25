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
import * as db from '../models/bookshelfModel';

const bookController = {

    // get all books (TEST MODE)
    getBooks: (_req:Request, res:Response, next:NextFunction):unknown => {
        res.locals.flag = 'success';
        res.locals.bookInfo = dummyData; 
        return next(); 
    },

};


export default bookController;