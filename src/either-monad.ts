import { Monad2 } from "fp-ts/Monad";
import { Either, Left, Right } from "fp-ts/Either";

const URI = "Either";
type URI = typeof URI;

// declare module 'fp-ts/HKT' {
//     interface URItoKind2<E, A> {
//         readonly [URI]: Either<E, A>;
//     }
// }

const left = <E, A>(e: E): Either<E, A> => ({ _tag: "Left", left: e });
const right = <E, A>(a: A): Either<E, A> => ({ _tag: "Right", right: a });

const Monad: Monad2<URI> = {
    URI,
    map: <E, A, B>(eitherEA: Either<E, A>, f: (a: A) => B): Either<E, B> => {
        switch (eitherEA._tag) {
            case "Left":
                return eitherEA;
            case "Right":
                return right(f(eitherEA.right));
        }
    },
    of: right,
    ap: <E, A, B>(
        eitherEAB: Either<E, (a: A) => B>,
        eitherEA: Either<E, A>
    ): Either<E, B> => {
        switch (eitherEAB._tag) {
            case "Left":
                return eitherEAB;
            case "Right": {
                switch (eitherEA._tag) {
                    case "Left":
                        return eitherEA;
                    case "Right":
                        return right(eitherEAB.right(eitherEA.right));
                }
            }
        }
    },
    chain: <E, A, B>(
        eitherEA: Either<E, A>,
        f: (a: A) => Either<E, B>
    ): Either<E, B> => {
        switch (eitherEA._tag) {
            case "Left":
                return eitherEA;
            case "Right":
                return f(eitherEA.right);
        }
    }
};

const r = Monad.chain(right(2), (a) => right(a + 2));
console.log(r);

const multiply = (a: number) => (b: number): number => a * b;

const r1 = Monad.ap(right(multiply(2)), right(3));
console.log(r1);
