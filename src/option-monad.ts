import { None, Option, Some } from "fp-ts/Option";
import { Monad1 } from "fp-ts/Monad";

const URI = "Option";
type URI = typeof URI;

// declare module "fp-ts/HKT" {
//     interface URItoKind<A> {
//         readonly [URI]: Option<A>;
//     }
// }

const none: None = { _tag: "None" };
const some = <A>(value: A): Some<A> => ({ _tag: "Some", value });

const Monad: Monad1<URI> = {
    URI,
    map: <A, B>(optA: Option<A>, f: (a: A) => B): Option<B> => {
        switch (optA._tag) {
            case "None":
                return none;
            case "Some":
                return some(f(optA.value));
        }
    },
    of: some,
    ap: <A, B>(optAB: Option<(a: A) => B>, optA: Option<A>): Option<B> => {
        switch (optAB._tag) {
            case "None":
                return none;
            case "Some": {
                switch (optA._tag) {
                    case "None":
                        return none;
                    case "Some":
                        return some(optAB.value(optA.value));
                }
            }
        }
    },
    chain: <A, B>(optA: Option<A>, f: (a: A) => Option<B>): Option<B> => {
        switch (optA._tag) {
            case "None":
                return none;
            case "Some":
                return f(optA.value);
        }
    }
};

const r = Monad.chain(some(2), (a) => some(a + 2));
console.log(r);

const multiply = (a: number) => (b: number): number => a * b;

const r1 = Monad.ap(some(multiply(2)), some(3));
console.log(r1);
