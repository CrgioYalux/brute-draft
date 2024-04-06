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

type BruteClassName<T extends string> = T | `overwrite${UppercaseFirstLetter<T>}`;

type BruteClassNames<T extends string[]> = {
    [K in BruteClassName<T[number]>]?: string;
};

type MinimumItemProps = {
    id: number;
    name: string;
} & Record<string, unknown>;

const Variants = ['initial', 'success', 'error', 'warning'] as const;
type Variant = typeof Variants[number];

type BruteComponent<HTMLElement, ClassNames extends string[]> = RemoveField<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLElement>, HTMLElement>,
    'className'
> & { classNames?: BruteClassNames<ClassNames> };

type ColorSchemesByVariant<Elements extends string[]> = {
    [Key in Variant]: {
        [K in Elements[number]]: string;
    }
};

type SVGIconComponent = React.FC<{ className?: string }>;
