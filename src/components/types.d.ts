type MinimumItemProps = {
    id: number;
    name: string;
} & Record<string, unknown>;

type KeysForBooleanValues<T> = {
    [K in keyof T]: T[K] extends boolean ? K : 'no boolean prop'
}[keyof T];

type UppercaseFirstLetter<S extends string> =
    S extends `${infer F}${infer Rest}`
        ? `${Uppercase<F>}${Rest}`
        : S;

type ClassName<T extends string> = T | `overwrite${UppercaseFirstLetter<T>}`;


type ClassNames<T extends string[]> = {
    [K in ClassName<T[number]>]?: string;
};
