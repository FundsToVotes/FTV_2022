import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql2'
import 'dotenv/config'

import indexRouter from './routes/hello.js';
import billsRouter from './routes/v1/bills.js';
import toptenRouter from './routes/v1/topten.js';
import addressRepresentativeRouter from './routes/v1/address_to_representatives.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createPool({
    connectionLimit: 5,
    host:"localhost",
    user:"root",
    password:"secret",
    database:"ftvBackEnd",
    port:"3308"
})

app.set("mysql", con)
app.use('/', indexRouter);
app.use('/v1/bills', billsRouter);
app.use('/v1/topten', toptenRouter);
app.use('/v1/addressRepresentative', addressRepresentativeRouter);

export default app;
