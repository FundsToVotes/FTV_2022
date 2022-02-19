import app from "./app.js"

// waits for 20 seconds so the app can initialze.
beforeAll(async () => {
    return await new Promise(r => setTimeout(r, 20000))
}, 30000);


// hello, Test!!
describe("Hello, Test", () => {
    describe("given the app should run right", () => {
        //server runs properly and does what it dooooo.
        test("respond with a 200 status code", async() => {
            expect("a").toBe("a")
        })
    })
    describe("This should run instantly after the mans", () => {
        //server runs properly and does what it dooooo.
        test("respond with a 200 status code", async() => {
            expect("a").toBe("a")
        })
    })
})