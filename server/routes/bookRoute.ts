import express from 'express';
// import types
import { Request, Response, NextFunction} from 'express';
import bookController from '../controllers/bookController';

const bookRouter = express.Router(); 

bookRouter.get('/', bookController.getBooks, (_req: Request, res:Response, next:NextFunction):void => {
    if (res.locals.flag === 'success') {
       res.status(200).json(res.locals.bookInfo);
    } else {
        res.status(400).end();
    }
}
);

export default bookRouter; 