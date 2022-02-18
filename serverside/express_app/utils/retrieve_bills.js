import axios from 'axios';

// this is the new house/senate setup-er
export async function getActiveBills(billArray, congressNumber, chamber) {
    // chamber can either be house or senate
    await axios
      .get(`https://api.propublica.org/congress/v1/${congressNumber}/${chamber}/bills/active.json`, {
          headers: {
              "X-API-Key": process.env.PROPUBLICA_API_KEY
          }
      })
      .then(async function(response) {
          // response.status is the axios status, response.data.status is how the api responded
          if (response.status == 200 && response.data.status == 'OK') {
              let bills = response.data.results[0].bills;
              for (const bill of bills) {
                  // look at representative_bills_details and see what I need from each bill to add
                  // to the map...
                  let billData = {}
                  let voteInformation = await findVoteInformation(bill.bill_slug, congressNumber)
                  billData.voteInformation = voteInformation
                  if (voteInformation != "null") {
                          
                      billData.billSlug = bill.bill_slug
                      billData.billId = bill.bill_id
                      billData.billNumber = voteInformation.rawResponse.bill.number
                      billData.sponsorId = bill.sponsor_id
                      billData.sponsorUri = bill.sponsor_uri
                      billData.billUri = bill.bill_uri
                      billData.title = bill.title
                      billData.latestAction = voteInformation.rawResponse.bill.latest_action
                      billData.shortTitle = bill.short_title
                      billData.primarySubject = bill.primary_subject

                      
                      billData.openSecretsSectorData = assignOpensecretsData(bill.primary_subject)
                      
                      billArray.push(billData)
                  }
                  
              }
              // get bill uri's data.
          }
          response.statusText
      })
    console.log(chamber + " bills loaded")

}

async function findVoteInformation(billSlug, congressNumber) {
    return new Promise ((resolve, reject) => {
        axios
            .get(`https://api.propublica.org/congress/v1/${congressNumber}/bills/${billSlug}.json`, {
                headers: {
                    "X-API-Key": process.env.PROPUBLICA_API_KEY
                }
            })
            .then(async response =>{
                if (response.status == 200 && response.data.status == 'OK') {
                    // vote occurred
                    if (response.data.results[0].votes.length > 0) {
                        // get vote information
                        // get the latest vote available
                        let voteUri = response.data.results[0].votes[0].api_url
                        // todo: test that 0 is always the latest and greatest
                        await resolve(parseVoterData(voteUri))
                    } else {
                        resolve("null")
                    }
                }
            })
      })  
}

async function parseVoterData(voteUri) {
    return new Promise ((resolve, reject) => {
        axios
            .get(voteUri, {
                headers: {
                    "X-API-Key": process.env.PROPUBLICA_API_KEY
                }
            })
            .then(async response => {
                if (response.status == 200 && response.data.status == 'OK') {
                    // vote occurred
                    let voteMap = new Map()
                    for (const position of response.data.results.votes.vote.positions) {
                        voteMap.set(position.member_id, position.vote_position)
                    }
                    resolve({
                        "voteMap":voteMap,
                        "rawResponse": response.data.results.votes.vote,
                        "voteUri": voteUri

                    })
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