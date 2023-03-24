// const express = require('express');
// const path = require('path');

import express from 'express';
import path from 'path';
const app = express();

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000; 

// import types
import { Request, Response, NextFunction} from 'express';


// const leaderList = [
//   {name: 'Anna', id: 'a0'},
//   {name: 'Ben', id: 'b0'},
//   {name: 'Clara', id: 'c0'},
//   {name: 'David', id: 'd0'},
// ];

// app.get('/api/leaders', (_req: Request, res: Response) => {
//   return res.status(200).send(leaderList);
// });

// if(process.env.NODE_ENV === 'production') {
//   // statically serve everything in the build folder on the route '/build'
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   // serve index.html on the route '/'
//   app.get('/', (_req: Request, res: Response) => {
//     return res.status(200).sendFile(path.join(__dirname, '../index.html'));
//   });
// }

// catch-all route handler 
app.use((_req: Request, res: Response) => res.status(404).send('This is not the page you\'re looking for...'));

// global error handler
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
}); //listens on port 3000 -> http://localhost:3000/