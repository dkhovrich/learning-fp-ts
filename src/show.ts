import { Kind, URIS } from "fp-ts/HKT";
import { Show } from "fp-ts/Show";
import { Functor1 } from "fp-ts/Functor";
import { internet, lorem, date } from "faker";
import { pipe } from "fp-ts/function";
import { array } from "fp-ts/Array";

const stringify = <F extends URIS, A>(F: Functor1<F>, A: Show<A>) => (
    structure: Kind<F, A>
): Kind<F, string> => F.map(structure, A.show);

interface Comment {
    readonly author: string;
    readonly text: string;
    readonly createdAt: Date;
}

const createComment = (): Comment => ({
    author: internet.email(),
    text: lorem.sentence(),
    createdAt: date.recent()
});

const comments = Array.from({ length: 3 }).map(createComment);

const showComment: Show<Comment> = {
    show: (a) => `Author: ${a.author}`
};

const r = pipe(comments, stringify(array, showComment));
console.log(r);
