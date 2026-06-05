import {SERVER_ERROR} from "@grest-ts/schema"
import type {HelloRequest, HelloResponse} from "@dummy-node/api/api/HelloApi"

export class HelloApiImpl {

    public hello = async (input: HelloRequest): Promise<HelloResponse> => {
        return {message: `Hello, ${input.name}!`}
    }

    public fail = async (): Promise<HelloResponse> => {
        throw new SERVER_ERROR({displayMessage: "Forced server error for browser-UI testing"})
    }
}
