/* This file contains a route that queries civicinfo.googleapis.com for
 * representative info for a given address. It can be an address, city,state
 * or a ZIP code. This file then stores some of the candidate date in our database so we can access things like photourls
 * and social medias.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);

var router = express.Router();
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

router.get('/', async function(req, res, next) {
  let address = req.query.address
  let pool = req.app.get("mysql")
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
        let payload = parseAndStoreRepresentatives(response, pool)
        res.send(payload)
      } else {
        res.status(400)
        res.send(response)
      }
      
    })
    .catch(error => {
      if (error.response) {
        res.status(error.response.status)
        res.send(error.response.statusText)
      } else {
        res.status(500)
        res.send(error)
      }
    })
});

let insertCandidateCivicInfo = `
  INSERT INTO
    candidate_civicinfo (\`name\`, address, party, photoUrl, office)
  VALUES  
    (?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    address=VALUES(address), 
    party=VALUES(party),
    photoUrl=VALUES(photoUrl),
    office=VALUES(office)
`
let insertCandidatePhoneNumber = `
  INSERT IGNORE INTO
    phone_number (candidate_civicinfo_id, phone)
  VALUES 
    (
      (SELECT id FROM candidate_civicinfo WHERE name=?),
      ?
    )
`
let insertCandidateUrl= `
  INSERT IGNORE INTO
    url (candidate_civicinfo_id, url)
  VALUES 
    (
      (SELECT id FROM candidate_civicinfo WHERE name=?),
      ?
    )
`
let insertChannel = `
  INSERT IGNORE INTO \`channel\` (platform) VALUES (?)
`
let insertCandidateCivicInfoChannel = `
  INSERT INTO 
    \`candidate_civicinfo-channel\` (candidate_civicinfo_id, channel_id, id)
  VALUES
      (
        (SELECT id FROM candidate_civicinfo WHERE \`name\`= ?),
        (SELECT id FROM channel WHERE platform = ?),
        ?
      )
  ON DUPLICATE KEY UPDATE
    id=VALUES(id)
`


// parses and also stores representative data for a representative.
// we are storing this data in a database because we cannot query a single name
// from google civic info and propublica does not have headshots.
// does this make sense? Check our workflow to ensure that a user cannot get to
// a politician summary without visiting the page. This only needs to happen once, so if
// a senator gets looked up ONCE in the workflow, we gucci.
function parseAndStoreRepresentatives(response, pool) {
  response = response.data
  console.log(response)
  let payload = {}
  payload["found_address"] = response.normalized_input
  payload["officials"] = []
  for (let i = 0; i < response.offices.length; i++) {
    let office = response.offices[i].name
    let officialIndicies = response.offices[i].officialIndices
    for (let j = 0; j < officialIndicies.length; j++) {
      let officialIndex = officialIndicies[j]
      let rawOfficialData = response.officials[officialIndex]
      rawOfficialData["office"] = office
      let official = {}
      official["office"] = office
      official["party"] = rawOfficialData.party
      official["name"] = rawOfficialData.name
      official["photoUrl"] = rawOfficialData.photoUrl
      payload["officials"].push(official)
      storeGoogleApiData(rawOfficialData, pool)
    }
  }
  return payload
}

function storeGoogleApiData(officialData, pool) {
  pool.getConnection(function(err, connection) {
    try {
      connection.query(
        insertCandidateCivicInfo,
        [officialData.name, JSON.stringify(officialData.address[0]), officialData.party, officialData.photoUrl, officialData.office],
        (queryErr, result) => {
          if (queryErr) console.log("Error inserting candidate civicinfo"+queryErr.toString())
      })
      batchInsertForCandidate(insertCandidatePhoneNumber, officialData.phones, officialData.name, connection)
      batchInsertForCandidate(insertCandidateUrl, officialData.urls, officialData.name, connection)
      officialData.channels.forEach(function (channel) {
        console.log(channel)
        connection.query(insertChannel, [channel.type], (queryErr, result) => {
          if (queryErr) console.log("Error inserting channel info"+ queryErr.toString())
        })
        connection.query(insertCandidateCivicInfoChannel, [officialData.name, channel.type, channel.id], (queryErr, result) => {
          if (queryErr) console.log("Error inserting channel-candidate info"+ queryErr.toString())
        })
      })
      connection.release()
    } catch (err) {
      console.log(err)
    }
  })
}

function batchInsertForCandidate(query, array, candidate, connection) {
  array.forEach(item => {
    connection.query(query, [candidate, item], (queryErr, result) => {
      if (queryErr) console.log("Error inserting batch candidate info" + queryErr.toString())
    })
  })
}

export default router;
