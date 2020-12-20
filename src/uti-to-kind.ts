interface MappableArray {
    readonly map: <A, B>(f: (a: A) => B) => (as: A[]) => B[];
}

// Type 'F' is not generic.
// interface Mappable<F> {
//     readonly map: <A, B>(f: (a: A) => B) => (as: F<A>) => F<B>;
// }

interface URItoKind<A> {
    Array: Array<A>;
    Set: Set<A>;
}

interface URItoKind2<A, B> {
    Map: Map<A, B>;
}

type URIS = keyof URItoKind<unknown>;
type URIS2 = keyof URItoKind2<unknown, unknown>;

type Kind<F extends URIS, A> = URItoKind<A>[F];
type Kind2<F extends URIS2, A, B> = URItoKind2<A, B>[F];

interface Mappable<F extends URIS> {
    readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>
}

const mappableArray: Mappable<"Array"> = {
    map: f => as => as.map(f)
}

const mappableSet: Mappable<"Set"> = {
    map: f => as => new Set(Array.from(as).map(f))
}

const multiply = (a: number) => (b: number): number => a * b;

const r1 = mappableArray.map(multiply(2))([1, 2, 3, 4, 5]);
console.log(r1);

const r2 = mappableSet.map(multiply(2))(new Set([1, 2, 3, 4, 5]));
console.log(r2);