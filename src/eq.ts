import { contramap, eqNumber } from "fp-ts/Eq";

type User = {
    userId: number;
    name: string;
};

const eqUser = contramap<number, User>((user) => user.userId)(eqNumber);

eqUser.equals(
    { userId: 1, name: "Giulio" },
    { userId: 1, name: "Giulio Canti" }
);
eqUser.equals({ userId: 1, name: "Giulio" }, { userId: 2, name: "Giulio" });
