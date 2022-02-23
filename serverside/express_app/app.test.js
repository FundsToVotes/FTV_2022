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
const REP_ID = "N000189"
// NOT DOXING MYSELF THIS IS SUPERMEX
const TEST_FULL_ADDRESS = "720 N 20th Ave, Pasco, WA 99301"
const TEST_ZIP= "99301"
const TEST_CITY_STATE= "Pasco, WA"
const TEST_STATE= "WA"

// waits for 20 seconds so the app can initialze.
beforeAll(async () => {
    return await new Promise(r => setTimeout(r, 20000))
}, 30000);

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
                expect(responseJson["representativeId"] == REP_ID)
                expect(responseJson["representativeName"] == REP_NAME)
                // im a dum dum and this is the best way to check if array in my head lmao
                expect(typeof(responseJson["votes"]) == typeof([]))
                // test that the vote json works
                expect(responseJson["votes"].length > 0)
                // test that the resposne json is made rightly 
                let voteJson = responseJson["votes"][0]
                expect(typeof(voteJson["session"]) == int)
                expect(typeof(voteJson["rollCall"]) == int)
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
        // test("404 error if representative name not found", async () => {
        //     // full name + first name
        //     await supertest(app).get(`/v1/bills?firstName=${BAD_FIRST_NAME}&lastName=${BAD_LAST_NAME}`)
        //     .expect(404)
        //     .then((response) => {
        //         expect(response.text).toBe(`Representative: ${BAD_FIRST_NAME + " " + BAD_LAST_NAME} not found in our data...`)
        //     })
        //     // full name + last name 
        //     await supertest(app).get(`/v1/bills?fullName=${BAD_NAME}`)
        //         .expect(404)
        //         .then((response) => {
        //             expect(response.text).toBe(`Representative: ${BAD_NAME} not found in our data...`)
        //         })
        // })
    })

    describe("/v1/topten", () => {
        test("endpoint should return hello", async () => {
            await supertest(app).get('/hello')
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe("hello")
                })
        })
    })

    describe("/v1/addressRepresentative", () => {
        test("", async () => {
            await supertest(app).get('/hello')
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe("hello")
                })
        })
    })

    describe("/v1/representativeDetails", () => {
        test("endpoint should return hello", async () => {
            await supertest(app).get('/hello')
                .expect(200)
                .then((response) => {
                    expect(response.text).toBe("hello")
                })
        })
    })
})
