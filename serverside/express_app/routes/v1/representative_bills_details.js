/* This file will contain all the details about a given representative
 * This also queries propublica to get their bill voting data. 
 */

import express from 'express';
import slugToUrl from '../../utils/slug_url.js';

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
        billPayload.congressDotGovUrl = slugToUrl(element.id.split("-")[0], element.id.split("-")[1])
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


export default router;
