import {chain, getMonoid, io, IO, map} from "fp-ts/IO";
import {fromNullable, Option} from "fp-ts/Option";
import {pipe} from "fp-ts/pipeable";
import {fold, Monoid, monoidSum} from "fp-ts/Monoid";
import {randomInt} from "fp-ts/Random";
import {IOEither, tryCatch} from "fp-ts/IOEither";

const storage: Record<string, string> = {};

const getItem = (key: string): IO<Option<string>> => () => fromNullable(storage[key]);

const setItem = (key: string, value: string): IO<void> => () => storage[key] = value;

const now: IO<number> = () => new Date().getTime();

const log = (s: unknown): IO<void> => () => console.log(s);

const random: IO<number> = () => Math.random();

// const randomBool: IO<boolean> = io.map(random, n => n < 0.5);

const randomBool: IO<boolean> = pipe(random, map(n => n < 0.5));

// const program: IO<void> = io.chain(randomBool, log);

// program();

type Die = IO<number>;

const monoidDie: Monoid<Die> = getMonoid(monoidSum);

const roll: (dice: Array<Die>) => Die = fold(monoidDie);

const D4: Die = randomInt(1, 4);
const D10: Die = randomInt(1, 10);
const D20: Die = randomInt(1, 20);

const dice = [D4, D10, D20];

pipe(
    roll(dice),
    chain(result => log(`Result is: ${result}`))
)();