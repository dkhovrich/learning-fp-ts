import axios, { AxiosResponse } from "axios";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/pipeable";

const URL = "https://jsonplaceholder.typicode.com/posts";

function httpGet(url: string): TE.TaskEither<Error, AxiosResponse> {
    return TE.tryCatch(
        () => axios.get(url),
        (error) => new Error(String(error))
    );
}

const logValue = <A>() =>
    TE.map((obj: A) => {
        console.log(obj);
        return obj;
    });

const getPosts = pipe(
    httpGet(URL),
    TE.map((response) => response.data),
    logValue()
);

getPosts();
// console.log(posts);
