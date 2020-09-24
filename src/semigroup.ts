import {
    fold,
    getFunctionSemigroup,
    getJoinSemigroup,
    getMeetSemigroup,
    getStructSemigroup, Semigroup, semigroupAll, semigroupAny, semigroupProduct,
    semigroupSum
} from "fp-ts/Semigroup";
import {contramap, ordNumber} from "fp-ts/Ord";
import {getApplySemigroup, none, some} from "fp-ts/Option";
import {getMonoid} from "fp-ts/Array";

const semigroupMin = getMeetSemigroup(ordNumber);
const semigroupMax = getJoinSemigroup(ordNumber);

console.log(semigroupMin.concat(1, 2));
console.log(semigroupMax.concat(1, 2));

type Point = { x: number; y: number };
type Vector = { from: Point, to: Point };

const points: Point[] = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
];

const vectors: Vector[] = [
    { from: points[0], to: points[1] },
    { from: points[2], to: points[3] }
];

const semigroupPoint = getStructSemigroup<Point>({
    x: semigroupSum,
    y: semigroupSum
});

const semigroupVector = getStructSemigroup<Vector>({
    from: semigroupPoint,
    to: semigroupPoint
});

console.log(semigroupPoint.concat(points[0], points[1]));
console.log(semigroupVector.concat(vectors[0], vectors[1]));

const semigroupPredicate = getFunctionSemigroup(semigroupAll)<Point>();

const isPositiveX = (p: Point): boolean => p.x >= 0
const isPositiveY = (p: Point): boolean => p.y >= 0

const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY)

console.log(isPositiveXY({ x: 1, y: 1 }));
console.log(isPositiveXY({ x: 1, y: -1 }));
console.log(isPositiveXY({ x: -1, y: 1 }));
console.log(isPositiveXY({ x: -1, y: -1 }));

const sum = fold(semigroupSum);

console.log(sum(0, [2, 4, 6, 8]));

const optionSemigroup = getApplySemigroup(semigroupSum);

console.log(optionSemigroup.concat(some(1), some(2)));
console.log(optionSemigroup.concat(some(1), none));

interface Customer {
    name: string
    favouriteThings: Array<string>
    registeredAt: number
    lastUpdatedAt: number
    hasMadePurchase: boolean
}

const semigroupCustomer = getStructSemigroup<Customer>({
   name: getJoinSemigroup(contramap((s: string) => s.length)(ordNumber)),
    favouriteThings: getMonoid<string>(),
    registeredAt: getMeetSemigroup(ordNumber),
    lastUpdatedAt: getJoinSemigroup(ordNumber),
    hasMadePurchase: semigroupAny
});

const customer = semigroupCustomer.concat(
    {
        name: 'Giulio',
        favouriteThings: ['math', 'climbing'],
        registeredAt: new Date(2018, 1, 20).getTime(),
        lastUpdatedAt: new Date(2018, 2, 18).getTime(),
        hasMadePurchase: false
    },
    {
        name: 'Giulio Canti',
        favouriteThings: ['functional programming'],
        registeredAt: new Date(2018, 1, 22).getTime(),
        lastUpdatedAt: new Date(2018, 2, 9).getTime(),
        hasMadePurchase: true
    }
);
console.log(customer);
