import type {HelloRequest, HelloResponse} from "@dummy-node/api/api/HelloApi"

export class HelloApiImpl {

    public hello = async (input: HelloRequest): Promise<HelloResponse> => {
        return {message: `Hello, ${input.name}!`}
    }
}
