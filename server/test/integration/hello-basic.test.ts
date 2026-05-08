import {GGTest} from "@grest-ts/testkit"
import {AppRuntime} from "../../src/AppRuntime"
import {HelloApi} from "@dummy-node/api/api/HelloApi"
import {TestContext} from "../TestContext"

describe("Hello API - Basic", () => {

    GGTest.startWorker(AppRuntime)

    const ctx = new TestContext("Test")
        .apis({hello: HelloApi})

    test("returns greeting for World", async () => {
        await ctx.hello.hello({name: "World"})
            .toMatchObject({message: "Hello, World!"})
    })

    test("returns greeting for Bob", async () => {
        await ctx.hello.hello({name: "Bob"})
            .toMatchObject({message: "Hello, Bob!"})
    })
})
