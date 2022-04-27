import app from "./app.js"
import supertest from 'supertest'

// dummy vars
const TEST_SENATOR = 1;
const BAD_FIRST_NAME = "Ludwig";
const BAD_LAST_NAME = "Ahgren";
const BAD_NAME = "Ludwig Ahgren";
const REP_FIRST_NAME = "Maria"
const REP_LAST_NAME = "Cantwell"
const REP_NAME = REP_FIRST_NAME + " " + REP_LAST_NAME
const REP_ID = "N00009825"

// // waits for 20 seconds so the app can initialze.
// beforeAll(async () => {
//     return await new Promise(r => setTimeout(r, 60000))
// }, 65000);

describe("Application Endpoint Tests", () => {
    describe("/hello", () => {
        test("endpoint should return hello", async () => {
            await supertest(app).get('/hello')
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe("hello")
                })
        })
    })

    describe("/v1/bills", () => {
        test("400 error without a full name", async () => {
            // no name
            await supertest(app).get('/v1/bills')
                .expect(400)
                .then((response) => {
                    expect(response.text).toBe("Please supply a first AND last name or a full name!!")
                })
        })
        test("400 error with only a first name", async () => {
            // first name only
            await supertest(app).get(`/v1/bills?firstName=${BAD_FIRST_NAME}`)
                .expect(400)
                .then((response) => {
                    expect(response.text).toBe("Please supply a first AND last name or a full name!!")
                })
        })
        test("400 error with only a last name", async () => {
            // last name only
            await supertest(app).get(`/v1/bills?lastName=${BAD_LAST_NAME}`)
                .expect(400)
                .then((response) => {
                    expect(response.text).toBe("Please supply a first AND last name or a full name!!")
                })
        })
        test("Retrieve bills if valid name is found", async () => {   
            // tests that the response is formatted correctly
            function testResponse(response) {
                let responseJson = response.body
                expect(responseJson["representativeName"] == REP_NAME)
                // im a dum dum and this is the best way to check if array in my head lmao
                expect(typeof(responseJson["votes"]) == typeof([]))
                // test that the vote json works
                expect(responseJson["votes"].length > 0)
                // test that the resposne json is made rightly 
                let voteJson = responseJson["votes"][0]
                expect(typeof(voteJson["session"]) == Number)
                expect(typeof(voteJson["rollCall"]) == Number)
                expect(typeof(voteJson["voteUri"]) == String)
                expect(typeof(voteJson["position"]) == String)
                expect(typeof(voteJson["bill"]["billId"]) == String)
                expect(typeof(voteJson["bill"]["sponsorId"]) == String)
                expect(typeof(voteJson["bill"]["sponsorUri"]) == String)
                expect(typeof(voteJson["bill"]["billUri"]) == String)
                expect(typeof(voteJson["bill"]["title"]) == String)
                expect(typeof(voteJson["bill"]["latestAction"]) == String)
                expect(typeof(voteJson["bill"]["shortTitle"]) == String)
                expect(typeof(voteJson["bill"]["primarySubject"]) == String)
                expect(typeof(voteJson["bill"]["openSecretsSectorPrefix"]) == String)
                expect(typeof(voteJson["bill"]["openSecretsSector"]) == String)
                expect(typeof(voteJson["bill"]["openSecretsSectorLong"]) == String)
                expect(typeof(voteJson["bill"]["congressDotGovUrl"]) == String)
            }     
            // full name
            await supertest(app).get(`/v1/bills?fullName=${REP_NAME}`)
                .expect(200)
                .then(testResponse)
            // full name + first name
            await supertest(app).get(`/v1/bills?fullName=${REP_NAME}&firstName=${REP_FIRST_NAME}`)
                .expect(200)
                .then(testResponse)
            // full name + last name 
            await supertest(app).get(`/v1/bills?fullName=${REP_NAME}&lastName=${REP_LAST_NAME}`)
                .expect(200)
                .then(testResponse)
            // full name + first name + last name
            await supertest(app).get(`/v1/bills?fullName=${REP_NAME}&firstName=${REP_FIRST_NAME}&lastName=${REP_LAST_NAME}`)
                .expect(200)
                .then(testResponse)
            // first + last name
            await supertest(app).get(`/v1/bills?firstName=${REP_FIRST_NAME}&lastName=${REP_LAST_NAME}`)
                .expect(200)
                .then(testResponse)
        })
        test("404 error if representative name not found", async () => {
            // first name + first name
            await supertest(app).get(`/v1/bills?firstName=${BAD_FIRST_NAME}&lastName=${BAD_LAST_NAME}`)
                .expect(404)
                .then((response) => {
                    expect(response.text).toBe(`No results found for ${BAD_FIRST_NAME} ${BAD_LAST_NAME}`)
                })
            // full name 
            await supertest(app).get(`/v1/bills?fullName=${BAD_NAME}`)
                .expect(404)
                .then((response) => {
                    expect(response.text).toBe(`No results found for ${BAD_FIRST_NAME} ${BAD_LAST_NAME}`)
                })
        })
    })

    describe("/v1/topten", () => {
        test("Endpoint should 400 when no information is supplied", async () => {
            await supertest(app).get('/v1/topten')
                .expect(400)
        })

        test("Endpoint should 200 when supplied with the a good name", async () => {
            await supertest(app).get('/v1/topten?firstName=Maria&lastName=Cantwell&cycle=2020')
                .expect(200)
                .then((response) => {
                    expect(response.body.length > 0)
                    let oneEntry = response.body[0]
                    expect(typeof(oneEntry["industry_name"]) == String)
                    expect(typeof(oneEntry["industry_code"]) == String)
                    expect(typeof(oneEntry["indivs"]) == Number)
                    expect(typeof(oneEntry["pacs"]) == Number)
                    expect(typeof(oneEntry["total"]) == Number)
                    expect(typeof(oneEntry["last_updated"]) == String)
                })
        })
        test("Endpoint should 404 when no results are found", async () => {
            await supertest(app).get('/v1/topten?cid=N000112192&cycle=2020')
                .expect(404)
            await supertest(app).get('/v1/topten?firstName=Your&lastName=Mom&cycle=2020')
                .expect(404)
        })
    })

    describe("/v1/addressRepresentative [Using WA]", () => {
        // NOT DOXING MYSELF THIS IS SUPERMEX
        const TEST_FULL_ADDRESS = "720 N 20th Ave, Pasco, WA 99301"
        const TEST_ZIP= "99301"
        const TEST_CITY_STATE= "Pasco, WA"
        const TEST_STATE_LONG= "Washington"
        const TEST_STATE_SHORT= "WA"
        test("Endpoint should 400 when no address is supplied", async () => {
            await supertest(app).get('/v1/addressRepresentative')
                .expect(400)
        })
        test("Endpoint should 400 when a bad address is supplied", async () => {
            await supertest(app).get('/v1/addressRepresentative?address=not a real state lol')
                .expect(404)
                .then((response) => {
                    expect(response.text).toBe(`Address not a real state lol not found!`)
                })
            await supertest(app).get('/v1/addressRepresentative?address=xd')
                .expect(404)
                .then((response) => {
                    expect(response.text).toBe(`Address xd not found!`)
                })
        })
        test("Endpoint should return 3 officials when Pasco, WA is supplied", async () => {
            await supertest(app).get(`/v1/addressRepresentative?address=${TEST_CITY_STATE}`)
                .expect(200)
                .then((response) => {
                    expect(response.body.officials.length == 3)
                })
        })
        test("Endpoint should return 3 officials when SuperMex's address is supplied", async () => {
            await supertest(app).get(`/v1/addressRepresentative?address=${TEST_FULL_ADDRESS}`)
                .expect(200)
                .then((response) => {
                    expect(response.body.officials.length == 3)
                })
        })
        test("Endpoint should return 3 officials when SuperMex's zip code is supplied", async () => {
            await supertest(app).get(`/v1/addressRepresentative?address=${TEST_ZIP}`)
                .expect(200)
                .then((response) => {
                    expect(response.body.officials.length == 3)
                })
        })
        // this is for 2022's reps.... this may need to be adjusted if wa gains or loses senators LMAO
        test("Endpoint should return 12 officials when WA or WASHINGTON is supplied", async () => {
            await supertest(app).get(`/v1/addressRepresentative?address=${TEST_STATE_SHORT}`)
                .expect(200)
                .then((response) => {
                    expect(response.body.officials.length == 12)
                })
                
            await supertest(app).get(`/v1/addressRepresentative?address=${TEST_STATE_LONG}`)
                .expect(200)
                .then((response) => {
                    expect(response.body.officials.length == 12)
                })
        })
    })

    describe("/v1/representativeDetails", () => {
        // no args supplied
        test("Endpoint should 400 when no arguments are supplied", async () => {
            await supertest(app).get('/v1/representativeDetails')
                .expect(400)
        })
        test("Endpoint should 400 when only one name is supplied", async () => {
            await supertest(app).get('/v1/representativeDetails?lastName=Thomas')
                .expect(400)
        })
        test("Endpoint should 400 when fullname only has one name", async () => {
            await supertest(app).get('/v1/representativeDetails?fullName=Thomas')
                .expect(400)
        })
        test("Endpoint should return data when a proper fullname is supplied", async () => {
            await supertest(app).get('/v1/representativeDetails?fullName=Dan Newhouse')
                .expect(200)
                .then((response) => {
                    expect(typeof(response.body.name) == String)
                    expect(typeof(response.body.address) == Object)
                    expect(typeof(response.body.party) == String)
                    expect(typeof(response.body.phones) == typeof([]))
                    expect(typeof(response.body.photoUrl) == String)
                    expect(typeof(response.body.urls) == typeof([]))
                    expect(typeof(response.body.socials) == typeof([]))
            })
        })
        test("Endpoint should return data when a proper first and last name is supplied", async () => {
            await supertest(app).get('/v1/representativeDetails?firstName=Dan&lastName=Newhouse')
            .expect(200)
            .then((response) => {
                expect(typeof(response.body.name) == String)
                expect(typeof(response.body.address) == Object)
                expect(typeof(response.body.party) == String)
                expect(typeof(response.body.phones) == typeof([]))
                expect(typeof(response.body.photoUrl) == String)
                expect(typeof(response.body.urls) == typeof([]))
                expect(typeof(response.body.socials) == typeof([]))
        })
        })
        test("Endpoint should 404 when no data for a particular candidate is found", async () => {
            await supertest(app).get('/v1/representativeDetails?firstName=Joe&lastName=Mama')
                .expect(404)
            await supertest(app).get('/v1/representativeDetails?fullName=Joe Mama')
                .expect(404)
        })
    })
})
