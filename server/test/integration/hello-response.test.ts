import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

describe("Hello API - Response", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    test("response contains a message field", async () => {
        await ctx.hello.hello({name: "Alice"})
            .toMatchObject({message: "Hello, Alice!"})
    })

    test("response message follows the greeting format", async () => {
        await ctx.hello.hello({name: "Carol"})
            .toMatchObject({message: "Hello, Carol!"})
    })

    test("repeated calls return consistent greetings", async () => {
        await ctx.hello.hello({name: "Dave"})
            .toMatchObject({message: "Hello, Dave!"})
        await ctx.hello.hello({name: "Dave"})
            .toMatchObject({message: "Hello, Dave!"})
    })
})
