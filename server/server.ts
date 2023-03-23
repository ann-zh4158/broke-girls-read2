// const express = require('express');
// const path = require('path');

import express from 'express';
import path from 'path';
const app = express();

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import types
import { Express, Request, Response} from 'express';

// uncomment the below for proxy challenge

const leaderList = [
  {name: 'Anna', id: 'a0'},
  {name: 'Ben', id: 'b0'},
  {name: 'Clara', id: 'c0'},
  {name: 'David', id: 'd0'},
];

app.get('/api/leaders', (_req: Request, res: Response) => {
  return res.status(200).send(leaderList);
});

if(process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (_req: Request, res: Response) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000); //listens on port 3000 -> http://localhost:3000/