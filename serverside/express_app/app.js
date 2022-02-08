import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql2'
import axios from 'axios';
import 'dotenv/config'

import indexRouter from './routes/hello.js';
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createPool({
    connectionLimit: 5,
    host:"localhost",
    user:"root",
    password:"secret",
    database:"ftvBackEnd",
    port:"3309"
})

let houseSenateMap = new Map()
axios
    .get("https://api.propublica.org/congress/v1/117/house/members.json", {
        headers: {
            "X-API-Key": process.env.PROPUBLICA_API_KEY
        }
    })
    .then(response => {
        response.statusText
        if (response.statusText == "OK") {
            response = response.data.results[0].members
            response.forEach(member => {
                houseSenateMap.set(`${member.first_name} ${member.last_name}`, member)
            })
        } else {
            throw Error("HOUSE MEMBERS WERE NOT ABLE TO LOAD!!!")
        }
    })
axios
    .get("https://api.propublica.org/congress/v1/117/senate/members.json", {
        headers: {
            "X-API-Key": process.env.PROPUBLICA_API_KEY
        }
    })
    .then(response => {
        response.statusText
        if (response.statusText == "OK") {
            response = response.data.results[0].members
            response.forEach(member => {
                houseSenateMap.set(`${member.first_name} ${member.last_name}`, member)
            })
        } else {
            throw Error("SENATE MEMBERS WERE NOT ABLE TO LOAD!!!")
        }
    })

app.set("mysql", con)
app.set("propublicaOfficialsData", houseSenateMap)
app.use('/', indexRouter);
app.use('/v1/bills', billsRouter);
app.use('/v1/topten', toptenRouter);
app.use('/v1/addressRepresentative', addressRepresentativeRouter);
app.use('/v1/representativeDetails', representativeDetails);

export default app;
