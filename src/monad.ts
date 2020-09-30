import {chain, flatten, none, Option, option, some} from "fp-ts/Option";
import {head} from "fp-ts/Array";
import {pipe} from "fp-ts/pipeable";

const ar = [5, 4, 3, 2, 1];

const inverse = (n: number): Option<number> => n === 0 ? none : some(1 / n);

const inverseHead: Option<Option<number>> = option.map(head(ar), inverse);
console.log(inverseHead);

const inverseHeadFlatten: Option<number> = flatten(option.map(head(ar), inverse));
console.log(inverseHeadFlatten);

const inverseHeadChain: Option<number> = option.chain(head(ar), inverse);
console.log(inverseHeadChain);

const inversePiped = pipe(ar, head, chain(inverse));
console.log(inversePiped);