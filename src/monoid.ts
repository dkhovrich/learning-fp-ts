import {
    fold,
    getStructMonoid,
    monoidAll,
    monoidAny,
    monoidProduct,
    monoidString,
    monoidSum
} from "fp-ts/Monoid";
import {
    getApplyMonoid,
    getFirstMonoid,
    getLastMonoid,
    none,
    Option,
    some
} from "fp-ts/Option";

console.log(fold(monoidSum)([1, 2, 3, 4, 5]));
console.log(fold(monoidProduct)([1, 2, 3, 4, 5]));
console.log(fold(monoidString)(["a", "b", "c"]));
console.log(fold(monoidAll)([true, false, true]));
console.log(fold(monoidAny)([true, false, true]));

const applyMonoid = getApplyMonoid(monoidSum);

console.log(applyMonoid.concat(some(1), some(2)));
console.log(applyMonoid.concat(some(1), none));

const firstMonoid = getFirstMonoid<number>();

console.log(firstMonoid.concat(some(1), none));
console.log(firstMonoid.concat(some(1), some(2)));

const lastMonoid = getLastMonoid<number>();

console.log(lastMonoid.concat(some(1), none));
console.log(lastMonoid.concat(some(1), some(2)));

interface Settings {
    fontFamily: Option<string>;
    fontSize: Option<number>;
    maxColumn: Option<number>;
}

const monoidSettings = getStructMonoid<Settings>({
    fontFamily: getLastMonoid<string>(),
    fontSize: getLastMonoid<number>(),
    maxColumn: getLastMonoid<number>()
});

const workspaceSettings: Settings = {
    fontFamily: some("Courier"),
    fontSize: none,
    maxColumn: some(80)
};

const userSettings: Settings = {
    fontFamily: some("Fira Code"),
    fontSize: some(12),
    maxColumn: none
};

const settings = monoidSettings.concat(workspaceSettings, userSettings);
console.log(settings);
