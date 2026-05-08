import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

describe("Hello API - Names", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    test("greets a single-character name", async () => {
        await ctx.hello.hello({name: "X"})
            .toMatchObject({message: "Hello, X!"})
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
