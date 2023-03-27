import express from 'express';
// import types
import { Request, Response, NextFunction} from 'express';
import bookController from '../controllers/bookController';

const bookRouter = express.Router(); 

bookRouter.get('/', bookController.getBooks, (_req: Request, res:Response, next:NextFunction):void => {
    
    // console.log(bookRouter.stack);

    try {
        res.status(200).json(res.locals.bookInfo);
    } catch (err) {
        next({log: 'error in get route', message: err});   // FOR DEV ONLY         
    }
}
);

bookRouter.post('/', bookController.addBooks, (_req: Request, res:Response, next:NextFunction):void => {

    try {
        res.status(200).json(res.locals.newBook);
    } catch (err) {
        next({log: 'error in post route', message: err});   // FOR DEV ONLY 
    }

}
);

bookRouter.put('/', bookController.updateBooks, (_req: Request, res:Response, next:NextFunction):void => {

    try {
        // if res.locals.editedURL is NOT empty --> status = 200
        if (!res.locals.edited) {
            res.status(200).json(res.locals.edited);
        } else {
            res.status(400).end();
        }
        
    } catch (err) {
        next({log: 'error in put route', message: err});  // FOR DEV ONLY 
    }

}
);

bookRouter.delete('/', bookController.deleteBooks, (_req: Request, res:Response, next:NextFunction):void => {

    try {
        res.status(200).json(res.locals.deleted);
    } catch (err) {
        next({log: 'error in delete route', message: err});  // FOR DEV ONLY 
    }

}
);


export default bookRouter; 