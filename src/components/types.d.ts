/* Type Utils */

type KeysForBooleanValues<T> = {
    [K in keyof T]: T[K] extends boolean ? K : 'no boolean prop'
}[keyof T];

type UppercaseFirstLetter<S extends string> =
    S extends `${infer F}${infer Rest}`
        ? `${Uppercase<F>}${Rest}`
        : S;

type RemoveField<Type, Field extends string> = {
	[Property in keyof Type as Exclude<Property, Field>]: Type[Property];
};

/* Component-Specific */

type ClassName<T extends string> = T | `overwrite${UppercaseFirstLetter<T>}`;

type ClassNames<T extends string[]> = {
    [K in ClassName<T[number]>]?: string;
};

type MinimumItemProps = {
    id: number;
    name: string;
} & Record<string, unknown>;

const Variants = ['initial', 'success', 'error', 'warning'] as const;
type Variant = typeof Variants[number];

type BruteComponentProps<HTMLElement> = RemoveField<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement>,
    'className'
>;

type SVGIconComponent = React.FC<{ className?: string }>;
