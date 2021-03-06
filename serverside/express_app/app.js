import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql2';
import cors from "cors";
import 'dotenv/config'

import helloRouter from './routes/hello.js';
import billsRouter from './routes/v1/representative_bills_details.js';
import toptenRouter from './routes/v1/candidate_top_ten_industries.js';
import addressRepresentativeRouter from './routes/v1/address_to_representatives.js';
import representativeDetails from './routes/v1/representative_details.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options("*", cors())

// // for building and deploying. 
// var con = mysql.createPool({
//     connectionLimit: 500,
//     host:"mysql",
//     user:"root",
//     password:"secret",
//     database:"ftvBackEnd"
// })

// for doing stuff locally without needing to build a docker image with express stuff. 
var con = mysql.createPool({
    connectionLimit: 500,
    host:"localhost",
    user:"root",
    password:"secret",
    database:"ftvBackEnd",
    port:"3309"
})

app.set("mysql", con)
app.use('/hello', helloRouter);
app.use('/v1/bills', billsRouter);
app.use('/v1/topten', toptenRouter);
app.use('/v1/addressRepresentative', addressRepresentativeRouter);
app.use('/v1/representativeDetails', representativeDetails);

export default app;