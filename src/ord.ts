import {between, clamp, contramap, fromCompare, geq, getDualOrd, gt, Ord, ordDate, ordNumber} from "fp-ts/Ord";

const ordNumberCustom = fromCompare<number>(((x, y) => x < y ? -1 : x > y ? 1 : 0));

const min = <T>(ord: Ord<T>) => (x: T, y: T): T => {
    return ord.compare(x, y) === 1 ? y : x;
}

const max = <T>(ord: Ord<T>) => (x: T, y: T): T => {
    return min(getDualOrd(ord))(x, y);
}

console.log(min(ordNumber)(1, 2));

type User = {
    name: string
    birthDate: Date
}

const users: User[] = [
    { name: 'Dima', birthDate: new Date("2000-01-01") },
    { name: 'Yana', birthDate: new Date("1991-01-01") }
];

const byBirthDate = contramap((user: User) => user.birthDate)(ordDate);

const getYoungest = max(byBirthDate);
const getOldest = min(byBirthDate);

console.log(getYoungest(users[0], users[1]));
console.log(getOldest(users[0], users[1]));

console.log(between(ordNumber)(1, 10)(5))

console.log(gt(ordNumber)(10, 10));
console.log(geq(ordNumber)(10, 10));