import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var router = express.Router();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/', async function(req, res, next) {
  let address = req.query.address
  if (!address) {
    res.status(400)
    res.send("please supply an address")
    return next()
  }
  let requestUrl = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&key=${GOOGLE_API_KEY}&levels=country&roles=legislatorUpperBody&roles=legislatorLowerBody`
  axios
    .get(requestUrl)
    .then(response => {
      if (response.statusText == 'OK') {
        response = response.data
        let payload = {}
        payload["found_address"] = response.normalized_input
        payload["officials"] = []
        for (let i = 0; i < response.offices.length; i++) {
          let office = response.offices[i].name
          let officialIndicies = response.offices[i].officialIndices
          for (let j = 0; j < officialIndicies.length; j++) {
            let officialIndex = officialIndicies[j]
            let rawOfficialData = response.officials[officialIndex]
            let official = {}
            official["office"] = office
            official["party"] = rawOfficialData.party
            official["name"] = rawOfficialData.name
            official["photoUrl"] = rawOfficialData.photoUrl
            payload["officials"].push(official)
          }
        }
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
