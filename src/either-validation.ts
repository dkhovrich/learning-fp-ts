import {chain, Either, getValidation, left, map, mapLeft, right} from "fp-ts/Either";
import {pipe} from "fp-ts/pipeable";
import {getSemigroup, NonEmptyArray, of} from "fp-ts/NonEmptyArray";
import {sequenceT} from "fp-ts/Apply";

const minLength = (s: string): Either<string, string> => s.length >= 6 ? right(s) : left("at least 6 characters");

const oneCapital = (s: string): Either<string, string> => /[A-Z]/g.test(s) ? right(s) : left("at least one capital letter");

const oneNumber = (s: string): Either<string, string> => /[0-9]/g.test(s) ? right(s) : left("at least one number");

const validatePassword = (s: string): Either<string, string> => pipe(s, minLength, chain(oneCapital), chain(oneNumber));

console.log(validatePassword('ab'));
console.log(validatePassword('abcdef'));
console.log(validatePassword('Abcdef'));

const applicativeValidation = getValidation(getSemigroup<string>());

const lift = <E, A>(check: (a: A) => Either<E, A>) => (a: A): Either<NonEmptyArray<E>, A> => {
    return pipe(check(a), mapLeft(of));
}

const minLengthV = lift(minLength);
const oneCapitalV = lift(oneCapital);
const oneNumberV = lift(oneNumber);

const validatePasswordV = (s: string): Either<NonEmptyArray<string>, string> => {
    return pipe(sequenceT(applicativeValidation)(minLengthV(s), oneCapitalV(s), oneNumberV(s)), map(() => s));
}

console.log(validatePasswordV("ab"));
console.log(validatePasswordV("abAB12"));