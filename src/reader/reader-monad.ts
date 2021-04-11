import { Functor2 } from "fp-ts/Functor";
import { Apply2 } from "fp-ts/Apply";
import { Applicative2 } from "fp-ts/Applicative";
import { Monad2 } from "fp-ts/Monad";

type Reader<E, A> = (env: E) => A;

const URI = "Reader";
type URI = typeof URI;

declare module "fp-ts/HKT" {
    interface URItoKind2<E, A> {
        readonly [URI]: Reader<E, A>;
    }
}

const Functor: Functor2<URI> = {
    URI,
    map: <E, A, B>(fa: Reader<E, A>, f: (a: A) => B): Reader<E, B> => (env) => {
        return f(fa(env));
    }
};

const Apply: Apply2<URI> = {
    ...Functor,
    ap: <E, A, B>(
        fab: Reader<E, (a: A) => B>,
        fa: Reader<E, A>
    ): Reader<E, B> => (env) => {
        const fn = fab(env);
        const a = fa(env);
        return fn(a);
    }
};

const Applicative: Applicative2<URI> = {
    ...Apply,
    of: <E, A>(a: A): Reader<E, A> => () => a
};

// @ts-ignore
const Monad: Monad2<URI> = {
    ...Applicative,
    chain: <E, A, B>(
        fa: Reader<E, A>,
        afb: (a: A) => Reader<E, B>
    ): Reader<E, B> => (env) => {
        const a = fa(env);
        const fb = afb(a);
        return fb(env);
    }
};
