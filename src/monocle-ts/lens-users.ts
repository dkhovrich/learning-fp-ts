import * as L from "monocle-ts/Lens";
import * as LO from "monocle-ts/lib/Optional";
import * as T from "monocle-ts/lib/Traversal";
import * as RA from "fp-ts/ReadonlyArray";
import { pipe } from "fp-ts/function";
import { log } from "fp-ts/Console";

type User = {
    id: string;
    name: string;
    isActive: boolean;
};

type State = {
    users: readonly User[];
};

const state = {
    users: [
        {
            id: "1",
            name: "Peter Parker",
            isActive: false
        },
        {
            id: "2",
            name: "Garry Osborn",
            isActive: false
        }
    ]
};

type Updater<T> = (s: T) => T;

function changeName(id: string, name: string): Updater<State> {
    return pipe(
        L.id<State>(),
        L.prop("users"),
        L.findFirst((u) => u.id === id),
        LO.prop("name"),
        LO.modify((_) => name)
    );
}

pipe(state, changeName("3", "Norman"), log)();

function updateIsActiveFlag(isActive: boolean): Updater<State> {
    return pipe(
        L.id<State>(),
        L.prop("users"),
        L.traverse(RA.readonlyArray),
        T.modify((u) => ({ ...u, isActive }))
    );
}

pipe(state, updateIsActiveFlag(true), log)();
