import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

const INJECT_FAILURES = process.env.TEST_INJECT_FAILURES === "1"

describe("Hello API - Basic", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    beforeAll(() => {
        console.log("[Hello API - Basic :: beforeAll] running")
    })

    beforeEach(() => {
        console.log("[Hello API - Basic :: beforeEach] running")
    })

    afterEach(() => {
        console.log("[Hello API - Basic :: afterEach] running")
    })

    afterAll(() => {
        console.log("[Hello API - Basic :: afterAll] running")
    })

    describe("beforeAll failure scenario", () => {
        beforeAll(() => {
            console.log("[beforeAll failure scenario :: beforeAll] running")
            if (INJECT_FAILURES) {
                throw new Error("Injected failure: beforeAll")
            }
        })

        afterAll(() => {
            // This should NOT run when INJECT_FAILURES is set, because beforeAll fails first.
            console.log("[beforeAll failure scenario :: afterAll] running")
        })

        test("returns greeting for World", async () => {
            await ctx.hello.hello({name: "World"})
                .toMatchObject({message: "Hello, World!"})
        })
    })

    describe("body failure scenario", () => {
        beforeAll(() => {
            console.log("[body failure scenario :: beforeAll] running")
        })

        beforeEach(() => {
            console.log("[body failure scenario :: beforeEach] running")
        })

        afterEach(() => {
            console.log("[body failure scenario :: afterEach] running")
        })

        afterAll(() => {
            console.log("[body failure scenario :: afterAll] running")
        })

        test("returns greeting for Bob", async () => {
            await ctx.hello.hello({name: "Bob"})
                .toMatchObject({message: "Hello, Bob!"})
            if (INJECT_FAILURES) {
                throw new Error("Injected failure: test body")
            }
        })
    })
})
