
import axios from 'axios';

// this is the new house/senate setup-er
export async function setupRepresentativeMap(representativeMap, congressNumber, chamber) {
    // chamber can either be house or senate
    // let representativeMap = new Map()
    await axios
        .get(`https://api.propublica.org/congress/v1/${congressNumber}/${chamber}/members.json`, {
            headers: {
                "X-API-Key": process.env.PROPUBLICA_API_KEY
            }
        })
        .then(response => {
            response.statusText
            if (response.statusText == "OK") {
                response = response.data.results[0].members
                response.forEach(member => {
                    representativeMap.set(`${member.first_name} ${member.last_name}`, member)
                })
            } else {
                throw Error(`${chamber} MEMBERS WERE NOT ABLE TO LOAD!!!`)
            }
        })
    console.log(chamber + "reps loaded.")
    return representativeMap
}



// This is legacy code. I want this part of the code gone
export function setupHouseSenateMap(congressNumber) {
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
    return houseSenateMap
}


