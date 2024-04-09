import { useId } from 'react';

const colorSchemes: ColorSchemesByVariant<['container', 'label', 'input', 'item']> = {
	initial: {
		container: '',
        label: 'bg-indigo-800 dark:bg-indigo-400',
		input: '',
		item: 'text-indigo-200 dark:text-indigo-800',
	},
	success: {
		container: '',
        label: 'bg-green-800 dark:bg-green-400',
		input: '',
		item: 'text-green-200 dark:text-green-800',
	},
	error: {
		container: '',
        label: 'bg-red-800 dark:bg-red-400',
		input: '',
		item: 'text-red-200 dark:text-red-800',
	},
	warning: {
		container: '',
        label: 'bg-yellow-800 dark:bg-yellow-400',
		input: '',
		item: 'text-yellow-200 dark:text-yellow-800',
	},
};

const defaultClassNames = (variant: Variant) => ({
    container: `flex flex-col gap-1`,
	label: `flex items-center justify-start gap-2 px-2 rounded-md cursor-pointer ${colorSchemes[variant].label}`,
	input: ``,
    item: `leading-8 tracking-wider font-semibold ${colorSchemes[variant].item}`,
});

interface GenericRadioInputItemProps<T> extends BruteComponent<
    HTMLInputElement,
    ['container', 'input']
> {
    children?: React.ReactNode;
    variant?: Variant;
    item: T;
    select: (item: T | null) => void;
    selected: T | null;
    allowToDeselect?: boolean;
}

const GenericRadioInputItem = <T,>({
    classNames,
    children,
    variant = 'initial',
    item,
    select,
    selected,
    allowToDeselect = false,
    ...inputProps
}: GenericRadioInputItemProps<T>): JSX.Element => {
    const id = useId();

	const containerClassName = classNames?.overwriteContainer ?? `${defaultClassNames(variant).label} ${classNames?.container ?? ''}`;
	const inputClassName = classNames?.overwriteInput ?? `${defaultClassNames(variant).input} ${classNames?.input ?? ''}`;

    return (
        <label className={containerClassName} htmlFor={id}>
            <input
            {...inputProps}
            className={inputClassName}
            type='radio'
            name={inputProps.name}
            id={id}
            onChange={() => select(item)}
            onClick={() => allowToDeselect && select(null)}
            />
            {children}
        </label>
    );
};

type GenericRadioInputListProps<T> = 
    BruteComponent<
    HTMLInputElement,
    ['container', 'label', 'input', 'item'],
    {
        list: T[];
        variant?: Variant;
        select: (item: T | null) => void;
        selected: T | null;
        allowToDeselect?: boolean;
        renderItemAs?: (item: T) => React.ReactNode;
        checkOnProp?: T extends string ? undefined : keyof T;
    }>;

const GenericRadioInputList = <T extends string | object,>({ 
    classNames,
    variant = 'initial',
    list,
    select,
    selected,
    allowToDeselect = false,
    renderItemAs,
    name,
    checkOnProp,
    ...inputProps
}: GenericRadioInputListProps<T>): JSX.Element => {
    const id = useId();

	const containerClassName = classNames?.overwriteContainer ?? `${defaultClassNames(variant).container} ${classNames?.container ?? ''}`;
	const itemClassName = classNames?.overwriteItem ?? `${defaultClassNames(variant).item} ${classNames?.item ?? ''}`;

    const isSelected = (n: number): boolean => typeof list[n] === 'object' && !!checkOnProp 
        ? list[n][checkOnProp] === selected?.[checkOnProp]
        : list[n] === selected;

    return (
        <div className={containerClassName}>
            {list.map((item, n) => (
                <GenericRadioInputItem
                {...inputProps}
                variant={variant}
                classNames={{
                    container: classNames?.label,
                    overwriteContainer: classNames?.overwriteLabel,
                    input: classNames?.input,
                    overwriteInput: classNames?.overwriteInput,
                }}
                item={item}
                name={name ?? id}
                select={select}
                selected={selected}
                allowToDeselect={allowToDeselect}
                checked={isSelected(n)}
                >
                    {typeof item === 'string' 
                    ? <span className={itemClassName}>{item}</span> 
                    : renderItemAs?.(item)}
                </GenericRadioInputItem>
            ))}
        </div>
    );
};

export default GenericRadioInputList;
