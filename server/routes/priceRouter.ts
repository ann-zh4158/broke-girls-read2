import express from 'express';
// import types
import { Request, Response} from 'express';
import priceController from '../controllers/priceController';

const priceRouter = express.Router();

priceRouter.get('/:id', priceController.getPrices, (_req:Request, res:Response):void => {
    // gets price history of books
    res.status(200).json(res.locals.priceHistory);
});

// update prices is done elsewhere bc it is scheduled to occur in the background

export default priceRouter;
