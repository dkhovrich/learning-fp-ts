import * as L from "monocle-ts/Lens";
import * as O from "monocle-ts/Optional";
import { pipe } from "fp-ts/function";
import { log } from "fp-ts/Console";
import { stringify } from "fp-ts/Json";
import { none, some } from "fp-ts/Option";

interface Street {
    num: number;
    name: string;
}
interface Address {
    city: string;
    street: Street;
}
interface Company {
    name: string;
    address: Address;
}
interface Employee {
    name: string;
    company: Company;
}

const employee: Employee = {
    name: "john",
    company: {
        name: "awesome inc",
        address: {
            city: "london",
            street: {
                num: 23,
                name: "high street"
            }
        }
    }
};

const capitalize = (s: string): string =>
    s.substring(0, 1).toUpperCase() + s.substring(1);

const capitalizeName = pipe(
    L.id<Employee>(),
    L.prop("company"),
    L.prop("address"),
    L.prop("street"),
    L.prop("name"),
    L.modify(capitalize)
);

pipe(employee, capitalizeName, stringify, log)();

const firstLetterOptional: O.Optional<string, string> = {
    getOption: (s) => (s.length > 0 ? some(s[0]!) : none),
    set: (a) => (s) => (s.length > 0 ? a + s.substring(1) : s)
};

const firstLetter = pipe(
    L.id<Employee>(),
    L.prop("company"),
    L.prop("address"),
    L.prop("street"),
    L.prop("name"),
    L.composeOptional(firstLetterOptional)
);

const m = pipe(
    firstLetter,
    O.modify((s) => s.toUpperCase())
);

pipe(employee, m, stringify, log)();
