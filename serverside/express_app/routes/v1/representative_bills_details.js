/* This file will contain all the details about a given representative
 * This also queries propublica to get their bill 
 * voting data. 
 */

import express from 'express';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { DEFAULT_ECDH_CURVE } from 'tls';

const __filename = fileURLToPath(import.meta.url);

var router = express.Router();
const PROPUBLICA_API_KEY = process.env.PROPUBLICA_API_KEY

router.get('/', async function(req, res, next) {
  // TODO I realized that I need to standardize how I do names...
  let representativeFirstName = req.query.first_name 
  let representativeLastName = req.query.last_name
  let representativeFullName = req.query.full_name

  if ((!representativeFirstName && !representativeLastName) && !representativeFullName) {
    res.status(400)
    res.send("Please supply a first AND last name or a full name!!")
    return next()
  } else if (representativeFirstName && representativeLastName) {
    representativeFullName = `${candidateFirstName} ${candidateLastName}`
  }
  let houseSenateMap = req.app.get("propublicaOfficialsData")
  let officialData = houseSenateMap.get(representativeFullName)
  if (!officialData) {
    res.status(400)
    res.send(`Representative: ${representativeFullName} not found in our data...`)
    return next()
  }
  let officialId = officialData.id
  let officialApiResponse = await fetchOfficialBills(officialId)
  if (officialApiResponse.status != "OK"){
    res.status(400)
    res.send(officialApiResponse)
    return next()
  }
  let billsToServe = {
    status: officialApiResponse.msg.Status,
    memberId: officialApiResponse.msg.member_id,
    numResults: officialApiResponse.msg.num_results,
    // totalVotes: officialApiResponse.msg., // idk what this field is used for or how it is relevant. Use votes.length lol
    offset: officialApiResponse.msg.offset,
    votes: []
  }
  let billsVotedOn = officialApiResponse.msg.votes
  for (let i = 0; i < billsVotedOn.length; i++) {
    let bill = billsVotedOn[i]
    let billSlug = bill.bill.bill_id.split("-")[0].toLowerCase()
    if (isActuallyABill(bill.question)) {
      // this todo is from the previous team... I moved it here bc it may be needed...
      //TODO - PUT THE "IF LATEST ACTION IS A DESRIRABLE ONE" STATEMENT HERE
      let billApiResponse = await fetchBillDetails(billSlug)
      if (billApiResponse.status != 'OK') {
        // error handling needs to be here... rn it is not good
        // res.status(400)
        // res.send({msg: "Thomas stop being lazy and fix this"})
        // return next()
        continue
      }
      // parse the bill response here...
      let votePayload = {}
      // from member api
      votePayload.session = bill.session
      votePayload.rollCall = bill.roll_call
      votePayload.voteUri = bill.vote_uri
      votePayload.position = bill.position
      // from bills api and members api
      let billPayload = {}
      billPayload.billId = bill.bill.bill_id
      billPayload.number = bill.bill.number
      billPayload.sponsorId = bill.bill.sponsor_id
      billPayload.billUri = billApiResponse.sponsor_id
      billPayload.title = bill.bill.title
      billPayload.latestAction = bill.bill.latest_action
      billPayload.shortTitle = billApiResponse.short_title
      billPayload.primarySubject = billApiResponse.primarySubject
      // opensecrets correlation
      billPayload.openSecretsSectorPrefix,
      billPayload.openSecretsSector,
      billPayload.openSecretsSectorLong = assignOpensecretsData(billApiResponse.primary_subject)
      // combine the two payloads
      votePayload.bill = billPayload
      billsToServe.votes.push(votePayload)

    }
  }
  res.send(billsToServe)
});

function fetchOfficialBills(officialId) {
  let requestUrl = `https://api.propublica.org/congress/v1/members/${officialId}/votes.json`
  return new Promise ((resolve, reject) => {
    axios.get(requestUrl, {
      headers: {
        "X-API-Key": process.env.PROPUBLICA_API_KEY
      }
    })
    .then(response => {
      if (response.statusText != 'OK') {
        resolve({status:"error", msg: "something went wrong fetching the bills voted on"})
      } else {
        resolve({status: "OK", msg: response.data.results[0]})
      }
    })
  })
}

function isActuallyABill(question) {
  let isBill = true
  switch (question) {
    // House
    case "On Agreeing to the Amendment":
		case "On Agreeing to the Resolution":
		case "On Ordering the Previous Question":
    // Senate
		case "On the Amendment":
		case "On the Motion to Proceed":
		case "On Cloture on the Motion to Proceed":
      isBill = false
      break
  }
  return isBill
}

function fetchBillDetails(billSlug) {
  let requestUrl = `https://api.propublica.org/congress/v1/117/bills/${billSlug}.json`
  return new Promise ((resolve, reject) => {
    axios.get(requestUrl, {
      headers: {
        "X-API-Key": process.env.PROPUBLICA_API_KEY
      }
    })
    .then(response => {
      if (response.data.status != 'OK') {
        resolve({status:"error", msg: "something went wrong fetching the bill details..."})
      } else {
        resolve({status: "OK", msg: response.data.results[0]})
      }
    })
  })
}

function assignOpensecretsData(primarySubject) {
  switch (primarySubject) {
    case "Health":
      return ["H", "Health", "Health"]
    case "Government Operations and Politics":
      return ["Z", "Joint Candidate Cmtes", "Joint Candidate Cmtes"] //Anyone affected by this would be a politician
    case "International Affairs":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"]
    case "Congress":
      return ["Z", "Joint Candidate Cmtes", "Joint Candidate Cmtes"] //Anyone affected by this would be a politician
    case "Crime and Law Enforcement":
      return ["P", "Labor", "Labor"] //Police Unions fall under Labor in Opensecrets
    case "Taxation":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"] //Taxation falls under Single Issue in Opensecrets
    case "Armed Forces and National Security":
      return ["D", "Defense", "Defense"]
    case "Public Lands and Natural Resources":
      return ["E", "Energy/Nat Resource", "Energy & Natural Resources"]
    case "Education":
      return ["W", "Other", "Other"]
    case "Transportation and Public Works":
      return ["M", "Transportation", "Transportation"]
    case "Immigration":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"]
    case "Science, Technology, Communications":
      return ["C", "Communic/Electronics", "Communications/Electronics"]
    case "Labor and Employment":
      return ["P", "Labor", "Labor"]
    case "Commerce":
      return ["N", "Misc Business", "Misc Business"]
    case "Environmental Protection":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"]
    case "Finance and Financial Sector":
      return ["F", "Finance/Insur/RealEst", "Finance, Insurance & Real Estate"]
    case "Energy":
      return ["E", "Energy/Nat Resource", "Energy & Natural Resources"]
    case "Civil Rights and Liberties, Minority Issues":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"]
    case "Agriculture and Food":
      return ["A", "Agribusiness", "Agribusiness"]
    case "Native Americans":
      return ["Q", "Ideology/Single-Issue", "Ideological/Single-Issue"]
    case "Economics and Public Finance":
      return ["F", "Finance/Insur/RealEst", "Finance, Insurance & Real Estate"]
    case "Law":
      return ["K", "Lawyers & Lobbyists", "Lawyers & Lobbyists"]
    case "Housing and Community Development":
      return ["C", "Construction", "Construction"]
    case "Emergency Management":
      return ["W", "Other", "Other"] //Not sure what to put here, so...
    case "Social Welfare":
      return ["P", "Labor", "Labor"] //Most of the people affected by this are working-class
    case "Sports and Recreation":
      return ["N", "Misc Business", "Misc Business"]
    case "Foreign Trade and International Finance":
      return ["N", "Misc Business", "Misc Business"]
    case "Families":
      return ["Y", "Unknown", "Unknown"] //Homemakers are listed as Unknown
    case "Arts, Culture, Religion":
      return ["W", "Other", "Other"]
    case "Water Resources Development":
      return ["E", "Energy/Nat Resource", "Energy & Natural Resources"]
    case "Animals":
      return ["A", "Agribusiness", "Agribusiness"]
    default: return ["Z", "PROBLEM", "PROBLEM"]
    }
}

export default router;
