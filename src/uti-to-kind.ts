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

type MyArray = Kind<"Array", string>;
type MySet = Kind<"Set", string>;
type MyMap = Kind2<"Map", string, number>;

interface Mappable<F extends URIS> {
    readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>
}

interface Mappable2<F extends URIS2> {
    readonly map: <A, B, C>(f: (a: B) => C) => (as: Kind2<F, A, B>) => Kind2<F, A, C>
}

const mappableArray: Mappable<"Array"> = {
    map: f => as => as.map(f)
}

const mappableSet: Mappable<"Set"> = {
    map: f => as => new Set(Array.from(as).map(f))
}

const mappableMap: Mappable2<"Map"> = {
    map: f => as => new Map(Array.from(as.entries()).map(([key, value]) => [key, f(value)] as const))
}

const multiply = (a: number) => (b: number): number => a * b;

const r1 = mappableArray.map(multiply(2))([1, 2, 3, 4, 5]);
console.log(r1);

const r2 = mappableSet.map(multiply(2))(new Set([1, 2, 3, 4, 5]));
console.log(r2);

const m = new Map<string, number>([["One", 1], ["Two", 2], ["Three", 3]]);
const r3 = mappableMap.map(multiply(2))(m);
console.log(r3);