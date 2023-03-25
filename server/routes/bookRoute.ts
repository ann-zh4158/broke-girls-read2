import express from 'express';
// import types
import { Request, Response, NextFunction} from 'express';
import bookController from '../controllers/bookController';

const bookRouter = express.Router(); 

bookRouter.get('/', bookController.getBooks, (_req: Request, res:Response):void => {
    // console.log(bookRouter.stack);
    console.log('getting');
    res.status(200).json(res.locals.bookInfo);
}
);

bookRouter.post('/', (req: Request, res:Response, next:NextFunction):void => {
    // bookController.addBook,
    // res.status(200).json(res.locals.newBook);
    console.log('1st line post');
    try {
        console.log('posting req body: ', req.body);
        res.status(200).json(req.body);
    } catch (err) {
        next({log: 'error in post route', message: err});
        
    }

}
);

// POST http://localhost:8080/books/
// content-type: application/json

// {
//     "title": "The Devotion of Suspect X",
//     "author": "Keigo Higashino",
//     "kindle_url": "https://www.amazon.com/Devotion-Suspect-Detective-Galileo-Novel-ebook/dp/B0044781ZQ/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=&sr=", 
//     "kobo_url": "https://www.kobo.com/us/en/ebook/the-devotion-of-suspect-x-1",
//     "nook_url": "https://www.barnesandnoble.com/w/devotion-of-suspect-x-keigo-higashino/1100337740?ean=9781429992312",   
// }


export default bookRouter; 