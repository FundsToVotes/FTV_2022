/* This file will contain all the details about a given representative
 * This also queries propublica to get their bill voting data. 
 */

import express from 'express';

var router = express.Router();

let bill_query = `
select
	position,
    vote_session.date,
    bill.*
from 
	vote 
left join
vote_session
on 
vote_session.id = vote_session_id
left join 
	bill
on
	bill.id = vote_session.bill_id
where 
	congressperson_id 
in 
	(SELECT
		id
	from 
		congressperson
	where 
		name = ? 
	and 
		congress_number=(
		select
			max(congress_number)
		from 
			congressperson        
		)
	)
limit ?
`


router.get('/', async function(req, res, next) {
  let representativeFirstName = req.query.firstName 
  let representativeLastName = req.query.lastName
  let representativeFullName = req.query.fullName
  let limit = req.query.limit? req.query.limit : 10

  if (
    (!representativeFirstName || !representativeLastName) &&
    !representativeFullName
  ) {
    res.status(400)
    res.send("Please supply a first AND last name or a full name!!")
    return next()
  } else if (representativeFirstName && representativeLastName) {
    representativeFullName = `${representativeFirstName} ${representativeLastName}`
  }
  
  let pool = req.app.get("mysql")
  pool.query(bill_query, [representativeFullName, limit], (err, data, fields) => {
    if(err){
      res.status(500)
      res.send({
        "error": err,
        "msg": "Internal Server error"
      })
      return
    }
    if (data.length > 0) {
      let billsToServe = {
        representativeName: representativeFullName,
        votes: []
      }
      data.forEach(element => {
        let votePayload = {}
        votePayload.position = element.position

        let billPayload = {}
        billPayload.billId = element.id
        billPayload.number = element.bill_number
        billPayload.sponsorId = element.sponsor_id
        billPayload.sponsorUri = element.sponsor_uri
        billPayload.billUri = element.bill_uri
        billPayload.title = element.title
        billPayload.latestAction = element.latest_action
        billPayload.shortTitle = element.short_title
        billPayload.primarySubject = element.primary_subject
        // opensecrets correlation
        billPayload.openSecretsSectorPrefix = element.opensecrets_sector_prefix
        billPayload.openSecretsSector = element.opensecrets_sector
        billPayload.openSecretsSectorLong = element.opensecrets_sector_long
        // combine the two payloads
        votePayload.bill = billPayload
        billsToServe.votes.push(votePayload)
      });
      res.send(billsToServe)
    } else {
      res.status(404)
      res.send("No results found for " + representativeFullName)
    }
  });
  return
  })

  // let senateMemberMap = req.app.get("senateMemberMap")
  // let houseMemberMap = req.app.get("houseMemberMap")
  // let representativeMemberFound = senateMemberMap.has(representativeFullName) ? 1 : houseMemberMap.has(representativeFullName) ? 2 : 0
  // let representativeData;
  // let voteData;
  // switch (representativeMemberFound) {
  //   case 0: 
  //     res.status(404)
  //     res.send(`Representative: ${representativeFullName} not found in our data...`)
  //     return next()
  //   case 1:
  //     representativeData = senateMemberMap.get(representativeFullName)
  //     voteData = req.app.get("senateBillData")
  //     break
  //   case 2: 
  //     representativeData = houseMemberMap.get(representativeFullName)
  //     voteData = req.app.get("houseBillData")
  //     break
  // }
  // let officialId = representativeData.id
  // let billsToServe = {
  //   representativeId: officialId,
  //   representativeName: representativeFullName,
  //   votes: []
  // }
  // voteData.forEach(bill => {
  //   if (bill.voteInformation.voteMap.has(officialId)) {
  //     let votePayload = {}
  //     votePayload.session = bill.voteInformation.rawResponse.session
  //     votePayload.rollCall = bill.voteInformation.rawResponse.roll_call
  //     votePayload.voteUri = bill.voteInformation.voteUri
  //     votePayload.position = bill.voteInformation.voteMap.get(officialId)

  //     let billPayload = {}
  //     billPayload.billId = bill.billId
  //     billPayload.number = bill.number
  //     billPayload.sponsorId = bill.sponsorId
  //     billPayload.sponsorUri = bill.sponsorUri
  //     billPayload.billUri = bill.billUri
  //     billPayload.title = bill.title
  //     billPayload.latestAction = bill.latestAction
  //     billPayload.shortTitle = bill.shortTitle
  //     billPayload.primarySubject = bill.primarySubject
  //     // opensecrets correlation
  //     billPayload.openSecretsSectorPrefix = bill.openSecretsSectorData[0]
  //     billPayload.openSecretsSector = bill.openSecretsSectorData[1]
  //     billPayload.openSecretsSectorLong = bill.openSecretsSectorData[2]
  //     // combine the two payloads
  //     votePayload.bill = billPayload
  //     billsToServe.votes.push(votePayload)
  //   }
  // })
  // res.send(billsToServe)
// });

export default router;
