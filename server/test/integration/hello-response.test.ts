import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

const INJECT_FAILURES = process.env.TEST_INJECT_FAILURES === "1"

// Delay for the one-shot setTimeout that injects "delayed" errors.
// Test bodies wait DELAYED_WAIT_MS so the throw fires while the test is running.
const DELAYED_FIRE_MS = 30
const DELAYED_WAIT_MS = 120

describe("Hello API - Response", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    beforeAll(() => {
        console.log("[Hello API - Response :: beforeAll] running")
    })

    beforeEach(() => {
        console.log("[Hello API - Response :: beforeEach] running")
    })

    afterEach(() => {
        console.log("[Hello API - Response :: afterEach] running")
    })

    afterAll(() => {
        console.log("[Hello API - Response :: afterAll] running")
    })

    describe("delayed beforeAll failure scenario", () => {
        beforeAll(() => {
            console.log("[delayed beforeAll failure scenario :: beforeAll] running (will schedule delayed throw)")
            if (INJECT_FAILURES) {
                // One-shot timer; fires once and self-clears. No leaked handle.
                setTimeout(() => {
                    throw new Error("Injected failure: delayed beforeAll (setTimeout)")
                }, DELAYED_FIRE_MS)
            }
        })

        afterAll(() => {
            console.log("[delayed beforeAll failure scenario :: afterAll] running")
        })

        test("response contains a message field", async () => {
            await ctx.hello.hello({name: "Alice"})
                .toMatchObject({message: "Hello, Alice!"})
            // Wait long enough for the delayed throw scheduled in beforeAll to fire.
            await new Promise(resolve => setTimeout(resolve, DELAYED_WAIT_MS))
        })
    })

    describe("delayed beforeEach failure scenario", () => {
        beforeAll(() => {
            console.log("[delayed beforeEach failure scenario :: beforeAll] running")
        })

        beforeEach(() => {
            console.log("[delayed beforeEach failure scenario :: beforeEach] running (will schedule delayed throw)")
            if (INJECT_FAILURES) {
                setTimeout(() => {
                    throw new Error("Injected failure: delayed beforeEach (setTimeout)")
                }, DELAYED_FIRE_MS)
            }
        })

        afterAll(() => {
            console.log("[delayed beforeEach failure scenario :: afterAll] running")
        })

        test("response message follows the greeting format", async () => {
            await ctx.hello.hello({name: "Carol"})
                .toMatchObject({message: "Hello, Carol!"})
            await new Promise(resolve => setTimeout(resolve, DELAYED_WAIT_MS))
        })

        test("repeated calls return consistent greetings", async () => {
            await ctx.hello.hello({name: "Dave"})
                .toMatchObject({message: "Hello, Dave!"})
            await ctx.hello.hello({name: "Dave"})
                .toMatchObject({message: "Hello, Dave!"})
            await new Promise(resolve => setTimeout(resolve, DELAYED_WAIT_MS))
        })
    })
})
