import app from "./app.js"
import supertest from 'supertest'

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
})
