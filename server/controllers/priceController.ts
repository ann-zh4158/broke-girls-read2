import { Request, Response, NextFunction} from 'express';
import db from '../models/bookshelfModel';

const priceController = {
    // only has one function, really
    getPrices: async (req:Request, res:Response, next:NextFunction):Promise<unknown> => {

        // req.query will have id of book entry 
        const id = req.query.id; 
        let sqlStr = `SELECT time, price 
        FROM kobo 
        WHERE kobo_id = $1;`;

        try {
            const koboHist = await db.query(sqlStr, [id]);

            sqlStr = `SELECT time, price 
            FROM kindle 
            WHERE kindle_id = $1;`;
    
            // const kindleHist = await db.query(sqlStr, [id]);
    
            // sqlStr = `SELECT time, price 
            // FROM nook 
            // WHERE nook_id = $1;`;
    
            const nookHist = await db.query(sqlStr, [id]);  
            
            // save all time series data into a struct inside field priceHistory in res.locals
            res.locals.priceHistory = {
                kobo: koboHist.rows,
                // kindle: kindleHist.rows,
                nook: nookHist.rows
            };

            return next();
            
        } catch (err) {
            return next({log: 'error in priceController.getPrices', message: err});
        }
        
    },

};

export default priceController;