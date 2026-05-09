import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

const INJECT_FAILURES = process.env.TEST_INJECT_FAILURES === "1"

describe("Hello API - Names", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    beforeAll(() => {
        console.log("[Hello API - Names :: beforeAll] running")
    })

    beforeEach(() => {
        console.log("[Hello API - Names :: beforeEach] running")
    })

    afterEach(() => {
        console.log("[Hello API - Names :: afterEach] running")
    })

    afterAll(() => {
        console.log("[Hello API - Names :: afterAll] running")
    })

    describe("beforeEach failure scenario", () => {
        beforeAll(() => {
            console.log("[beforeEach failure scenario :: beforeAll] running")
        })

        beforeEach(() => {
            console.log("[beforeEach failure scenario :: beforeEach] running")
            if (INJECT_FAILURES) {
                throw new Error("Injected failure: beforeEach")
            }
        })

        afterEach(() => {
            console.log("[beforeEach failure scenario :: afterEach] running")
        })

        afterAll(() => {
            console.log("[beforeEach failure scenario :: afterAll] running")
        })

        test("greets a single-character name", async () => {
            await ctx.hello.hello({name: "X"})
                .toMatchObject({message: "Hello, X!"})
        })
    })

    describe("afterEach failure scenario", () => {
        beforeAll(() => {
            console.log("[afterEach failure scenario :: beforeAll] running")
        })

        beforeEach(() => {
            console.log("[afterEach failure scenario :: beforeEach] running")
        })

        afterEach(() => {
            console.log("[afterEach failure scenario :: afterEach] running")
            if (INJECT_FAILURES) {
                throw new Error("Injected failure: afterEach")
            }
        })

        afterAll(() => {
            console.log("[afterEach failure scenario :: afterAll] running")
        })

        test("greets a multi-word name", async () => {
            await ctx.hello.hello({name: "John Doe"})
                .toMatchObject({message: "Hello, John Doe!"})
        })

        test("greets a name with unicode characters", async () => {
            await ctx.hello.hello({name: "Žiga"})
                .toMatchObject({message: "Hello, Žiga!"})
        })
    })
})
