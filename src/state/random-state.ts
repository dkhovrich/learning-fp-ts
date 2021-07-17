import * as S from "fp-ts/State";
import { pipe } from "fp-ts/function";
import { log } from "fp-ts/Console";

type Random<A> = S.State<number, A>;

const random: Random<number> = (seed) => {
    const nextSeed = (1839567234 * seed + 972348567) % 8239451023;
    return [nextSeed, nextSeed];
};

function randomInRange(max: number, min: number): Random<number> {
    return pipe(
        random,
        S.map((num) => min + Math.floor((num / 8239451023) * (max - min)))
    );
}

function randomIn<T>(arr: T[]): Random<T> {
    return pipe(
        randomInRange(0, arr.length),
        S.map((index) => arr[index]!)
    );
}

const randomFirstName: Random<string> = randomIn([
    "Paul",
    "Nicole",
    "Zane",
    "Ellie"
]);

const randomLastName: Random<string> = randomIn([
    "Gray",
    "Smith",
    "Jones",
    "Williams"
]);

const seed = 1234;

pipe(randomFirstName(seed), log)();
pipe(randomLastName(seed), log)();
