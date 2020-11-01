import * as O from "fp-ts/Option";
import {pipe} from "fp-ts/pipeable";
import {sequenceT} from "fp-ts/Apply";

const add = (a: number) => (b: number): number => a + b;

const r0 = O.map(add)(O.some(2));
console.log(r0);

const r1 = pipe(O.some(2), O.chain(two => pipe(O.some(3), O.map(add(two)))));
console.log(r1);

const r3 = pipe(O.some(2), O.map(add), O.ap(O.some(3)));
console.log(r3);

const r4 = pipe(
    sequenceT(O.option)(O.some(1), O.some(2), O.some("test")),
    // O.map(a => a)
);
console.log(r4);