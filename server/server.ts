import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import scheduleScrape from './background';

import express from 'express';
import path from 'path';
const app = express();

import bookRouter from './routes/bookRouter';
import priceRouter from './routes/priceRouter';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000; 

// import types
import { Request, Response, NextFunction} from 'express';

/**
* Automatically parse urlencoded body content and form data from incoming requests and place it
* in req.body
*/

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// serve production mode static files
if(process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (_req: Request, res: Response):void => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

// mount specific sub-routes
app.use('/books', bookRouter);
app.use('/price', priceRouter);

// // route handler to interact with main app 
// app.get('/home', bookController.getBooks, (_req:Request, res:Response):void => {

//   // gets ALL entries from database
//   res.status(200).json(res.locals.bookInfo);

// });

// catch-all route handler 
app.use((_req: Request, res: Response): unknown => res.status(404).send('This is not the page you\'re looking for...'));

// global error handler
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction): unknown => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// declare new instance of scheduler class
const scheduler = new ToadScheduler(); 

// create task 
const job = new SimpleIntervalJob({hours: 1, runImmediately: true}, 
    scheduleScrape, {id: 'id_1', preventOverrun: true});
    
// // start scheduled task ---> nodemon reloading honestly creates some issues   
// console.log('starting scheduled task ... \n');
// scheduler.addSimpleIntervalJob(job);
// console.log(scheduler.getById('id_1').getStatus());       

// listen for active server port
app.listen(PORT, ():void => {
  console.log(`Server listening on port: ${PORT}... \n`);
}); //listens on port 3000 -> http://localhost:3000/ 
    
// // stop task on killing server
// process.on('SIGINT', function() {
//     scheduler.stop();
//     console.log('server has been killed... stopping task \n');
//     console.log(scheduler.getById('id_1').getStatus());
//     process.exit(0);
// });