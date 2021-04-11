import * as R from "fp-ts/Reader";
import { pipe } from "fp-ts/function";
import { sequenceS } from "fp-ts/Apply";

interface AppConfig {
    readonly host: string;
    readonly port: number;
    readonly connectionString: string;
}

type Database = "connected to the db";
type Express = "express is listening";

type App<A> = R.Reader<AppConfig, A>;

const expressServer: App<Express> = pipe(
    R.ask<AppConfig>(),
    R.map((config) => {
        console.log(`${config.host}:${config.port}`);
        return "express is listening";
    })
);

const databaseConnection: App<Database> = pipe(
    R.asks<AppConfig, string>((cfg) => cfg.connectionString),
    R.map((connectionString) => {
        console.log(connectionString);
        return "connected to the db";
    })
);

const seq = sequenceS(R.Apply);

const application: App<void> = pipe(
    seq({
        db: databaseConnection,
        express: expressServer
    }),
    R.map(({ db, express }) => {
        console.log([db, express].join("; "));
        console.log("app was initialized");
        return;
    })
);

application({
    host: "localhost",
    port: 8080,
    connectionString: "mongo://localhost:271017"
});
