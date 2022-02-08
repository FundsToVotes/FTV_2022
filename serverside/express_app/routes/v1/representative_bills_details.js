/* This file will contain all the details about a given representative
 * This also queries propublica to get their bill 
 * voting data. 
 */

import express from 'express';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

var router = express.Router();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/', async function(req, res, next) {

  // get member's votes (use propublica members.json)
	// request_url := "https://api.propublica.org/congress/v1/members/" + member_id + "/votes.json"
  // get bill's details
	// request_url := "https://api.propublica.org/congress/v1/117/bills/" + bill_slug + ".json"

  let requestUrl = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&key=${GOOGLE_API_KEY}&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody`
  axios
    .get(requestUrl)
    .then(response => {
        
      if (response.statusText == 'OK') {
        parseAndStoreRepresentatives(response, null)
        res.send(payload)
      } else {
        res.status(400)
        res.send(response)
      }
      
    })
    .catch(error => {
      res.status(500)
      res.send(error)
    })
});


export default router;
