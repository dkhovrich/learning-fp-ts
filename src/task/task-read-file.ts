import * as fs from "fs";
import * as path from "path";
import * as T from "fp-ts/Task";
// import * as TE from "fp-ts/TaskEither";
import { Lazy, pipe } from "fp-ts/function";
// import * as E from "fp-ts/Either";
// import * as Console from "fp-ts/Console";

fs.promises
    .readFile(path.join(__dirname, "file1"))
    .then((f) => f.toString("utf8"))
    .then((r) => console.log(r));

// function fromThunk<T>(thunk: Lazy<Promise<T>>): TE.TaskEither<Error, T> {
//     return TE.tryCatch(thunk, E.toError);
// }

function fromThunk<T>(thunk: Lazy<Promise<T>>): T.Task<T> {
    return thunk;
}

function readFile(filePath: string): T.Task<Buffer> {
    return fromThunk(() => fs.promises.readFile(filePath));
}

const program = pipe(
    path.join(__dirname, "file1"),
    readFile,
    T.map((buffer) => buffer.toString("utf8"))
    // T.chain((str) => T.fromIO(() => Console.log(str)))
);

(async () => {
    const result = await program();
    console.log(result);
})();
