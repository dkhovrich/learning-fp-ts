import * as fs from "fs";
import * as path from "path";
import { pipe } from "fp-ts/function";
import * as Console from "fp-ts/Console";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/ReadonlyArray";

const readFile = TE.taskify(fs.readFile);
const writeFile = TE.taskify(fs.writeFile);

const program = pipe(
    ["file1", "file2", "file3"],
    A.map((filePath) => path.join(__dirname, filePath)),
    A.map(readFile),
    TE.traverseSeqArray(TE.map((buffer) => buffer.toString("utf8"))),
    TE.chain((fileContents) =>
        writeFile(path.join(__dirname, "result"), fileContents.join(`\n\n`))
    ),
    TE.match(
        (err) => Console.error(`An error happened: ${err.message}`),
        () => Console.log("All good!")
    )
);

(async () => {
    const showResult = await program();
    showResult();
})();
