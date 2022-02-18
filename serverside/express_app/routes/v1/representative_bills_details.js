/* This file will contain all the details about a given representative
 * This also queries propublica to get their bill 
 * voting data. 
 */

import express from 'express';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

var router = express.Router();

router.get('/', async function(req, res, next) {
  let representativeFirstName = req.query.firstName 
  let representativeLastName = req.query.lastName
  let representativeFullName = req.query.fullName

  if ((!representativeFirstName && !representativeLastName) && !representativeFullName) {
    res.status(400)
    res.send("Please supply a first AND last name or a full name!!")
    return next()
  } else if (representativeFirstName && representativeLastName) {
    representativeFullName = `${representativeFirstName} ${representativeLastName}`
  }
  // let houseSenateMap = req.app.get("propublicaOfficialsData")
  let senateMemberMap = req.app.get("senateMemberMap")
  let houseMemberMap = req.app.get("houseMemberMap")
  let representativeMemberFound = senateMemberMap.has(representativeFullName) ? 1 : houseMemberMap.has(representativeFullName) ? 2 : 0
  let representativeData;
  let voteData;
  switch (representativeMemberFound) {
    case 0: 
      res.status(400)
      res.send(`Representative: ${representativeFullName} not found in our data...`)
      return next()
    case 1:
      representativeData = senateMemberMap.get(representativeFullName)
      voteData = req.app.get("senateBillData")
      break
    case 2: 
      representativeData = houseMemberMap.get(representativeFullName)
      voteData = req.app.get("houseBillData")
      break
  }
  let officialId = representativeData.id
  let billsToServe = {
    representativeId: officialId,
    representativeName: representativeFullName,
    votes: []
  }
  voteData.forEach(bill => {
    if (bill.voteInformation.voteMap.has(officialId)) {
      let votePayload = {}
      votePayload.session = bill.voteInformation.rawResponse.session
      votePayload.rollCall = bill.voteInformation.rawResponse.roll_call
      votePayload.voteUri = bill.voteInformation.voteUri
      votePayload.position = bill.voteInformation.voteMap.get(officialId)

      let billPayload = {}
      billPayload.billId = bill.billId
      billPayload.number = bill.number
      billPayload.sponsorId = bill.sponsorId
      billPayload.sponsorUri = bill.sponsorUri
      billPayload.billUri = bill.billUri
      billPayload.title = bill.title
      billPayload.latestAction = bill.latestAction
      billPayload.shortTitle = bill.shortTitle
      billPayload.primarySubject = bill.primarySubject
      // opensecrets correlation
      billPayload.openSecretsSectorPrefix = bill.openSecretsSectorData[0]
      billPayload.openSecretsSector = bill.openSecretsSectorData[1]
      billPayload.openSecretsSectorLong = bill.openSecretsSectorData[2]
      // combine the two payloads
      votePayload.bill = billPayload
      billsToServe.votes.push(votePayload)
    }
  })
  res.send(billsToServe)
});

export default router;
