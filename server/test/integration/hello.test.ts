import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

const INJECT_FAILURES = process.env.TEST_INJECT_FAILURES === "1"

describe("Hello API", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    beforeAll(() => {
        console.log("[Hello API :: beforeAll] running")
    })

    beforeEach(() => {
        console.log("[Hello API :: beforeEach] running")
    })

    afterEach(() => {
        console.log("[Hello API :: afterEach] running")
    })

    afterAll(() => {
        console.log("[Hello API :: afterAll] running")
        if (INJECT_FAILURES) {
            throw new Error("Injected failure: afterAll")
        }
    })

    test("hello returns greeting", async () => {
        await ctx.hello.hello({name: "World"})
            .toMatchObject({message: "Hello, World!"})
    })

    test("hello returns greeting with custom name", async () => {
        await ctx.hello.hello({name: "Alice"})
            .toMatchObject({message: "Hello, Alice!"})
    })
})
