import {
	useId,
} from 'react';

import {
	isIncludedIn,
} from '../utils';

const colorsByVariant: ColorSchemesByVariant<['span', 'input', 'capacity', 'button']> = {
	initial: {
		span: 'text-black dark:text-white',
		input: 'bg-indigo-800 dark:bg-indigo-200 text-indigo-200 dark:text-indigo-800',
        capacity: 'text-indigo-300 dark:text-indigo-700',
        button: 'text-indigo-800 dark:text-indigo-200',
	},
	success: {
		span: 'text-black dark:text-white',
		input: 'bg-green-800 dark:bg-green-200 text-green-200 dark:text-green-800',
        capacity: 'text-green-300 dark:text-green-700',
        button: 'text-green-800 dark:text-green-200',
	},
	error: {
		span: 'text-black dark:text-white ',
		input: 'bg-red-800 dark:bg-red-200 text-red-200 dark:text-red-800',
        capacity: 'text-red-300 dark:text-red-700',
        button: 'text-red-800 dark:text-red-200',
	},
	warning: {
		span: 'text-black dark:text-white',
		input: 'bg-yellow-800 dark:bg-yellow-200 text-yellow-200 dark:text-yellow-800',
        capacity: 'text-yellow-300 dark:text-yellow-700',
        button: 'text-yellow-800 dark:text-yellow-200',
	},
};

const defaultClassNames = (variant: Variant) => ({
	label: 'flex items-center gap-2',
	span: `flex-none grow-0 min-w-max ${colorsByVariant[variant]?.span}`,
	textarea: `relative flex-none`,
	input: `rounded p-1 resize-none ${colorsByVariant[variant]?.input}`,
    capacity: `absolute bottom-1 right-1 text-sm font-bold opacity-80 ${colorsByVariant[variant]?.capacity}`,
	button: `w-max ${colorsByVariant[variant]?.button} underline cursor-pointer`,
});

const letters = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '"¡!#$%&\'()*+,-./:;<=>¿?@[\\]^_`{|}~';
const spaces = ' ';

interface CapacityProps {
    className?: string;
    show?: boolean;
    max?: number;
    input: number;
}

const Capacity: React.FC<CapacityProps> = ({
    className = '',
    show = true,
    max,
    input,
}) => {
    if (!show) return;
    if (max === undefined) return;
    return <span className={className}>{max - input}</span>
};

interface TextareaProps extends BruteComponent<
	HTMLTextAreaElement,
	['label', 'span', 'input', 'textarea', 'capacity']
> {
	label?: React.ReactNode;
	variant?: Variant;
    onlyLetters?: boolean;
    onlyNumbers?: boolean;
    onlySymbols?: boolean;
    onlySpaces?: boolean;
    onlyAllow?: string | RegExp;
    allowLetters?: boolean;
    allowNumbers?: boolean;
    allowSymbols?: boolean;
    allowSpaces?: boolean;
    allow?: string | RegExp;
	setText: (prev: string) => void;
	text: string;
    showCapacity?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ 
	classNames,
	label = 'Text',
	variant = 'initial',
    onlyLetters = false,
    onlyNumbers = false,
    onlySymbols = false,
    onlySpaces = false,
    onlyAllow,
    allowLetters = true && (!onlyNumbers && !onlySymbols && !onlySpaces),
    allowNumbers = true && (!onlyLetters && !onlySymbols && !onlySpaces),
    allowSymbols = true && (!onlyLetters && !onlyNumbers && !onlySpaces),
    allowSpaces = true && (!onlyLetters && !onlyNumbers && !onlySymbols),
    allow = '',
	setText = () => {},
	text = '',
    showCapacity = true,
	...textareaProps
}) => {
	const id = useId();

	const labelClassName = classNames?.overwriteLabel ?? `${defaultClassNames(variant)?.label} ${classNames?.label ?? ''}`;
	const spanClassName = classNames?.overwriteSpan ?? `${defaultClassNames(variant)?.span} ${classNames?.span ?? ''}`;
	const textareaClassName = classNames?.overwriteTextarea ?? `${defaultClassNames(variant)?.textarea} ${classNames?.textarea ?? ''}`;
	const inputClassName = classNames?.overwriteInput ?? `${defaultClassNames(variant)?.input} ${classNames?.input ?? ''}`;
	const capacityClassName = classNames?.overwriteCapacity ?? `${defaultClassNames(variant)?.capacity} ${classNames?.capacity ?? ''}`;

	return (
		<label className={labelClassName} htmlFor={id}>
			<span className={spanClassName}>
				{label}
			</span>
            <div className={textareaClassName}>
                <textarea
                    {...textareaProps}
                    className={inputClassName}
                    id={id}
                    value={text}
                    onChange={(event) => {
                        const value = event.target.value;

                        if (value === '') setText('');
                        
                        if (typeof onlyAllow === 'string') {
                            const isIncludedInOnlyAllow = isIncludedIn([...onlyAllow]);

                            if (
                                Array
                                .from(value)
                                .map(isIncludedInOnlyAllow)
                                .filter(Boolean)
                                .length === value.length
                            ) return setText(value);
                        }
                        else if (
                            typeof onlyAllow === 'object' &&
                            (onlyAllow.exec(value) ?? [])
                            .pop() === value
                        ) return setText(value);

                        const whitelist: string[] = [];
                        allowLetters && whitelist.push(...letters);
                        allowNumbers && whitelist.push(...numbers);
                        allowSymbols && whitelist.push(...symbols);
                        allowSpaces && whitelist.push(...spaces);

                        if (typeof allow === 'string' && !!allow)
                            whitelist.push(...allow);

                        const isIncludedInWhitelist = isIncludedIn(whitelist);

                        if (
                            (typeof allow === 'object' &&
                            (allow.exec(value) ?? [])
                            .pop() === value)
                            ||
                            Array
                            .from(value)
                            .map(isIncludedInWhitelist)
                            .filter(Boolean)
                            .length === value.length
                        ) setText(value);
                    }}
                />
                <Capacity 
                className={capacityClassName}
                show={showCapacity}
                max={textareaProps.maxLength}
                input={text.length}
                />
            </div>
		</label>
	)
};

export default Textarea;
