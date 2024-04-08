import { useId } from 'react';

type Modifier = {
    checked: boolean;
    atomic: boolean;
};

const colorsByVariant = (modifier?: Modifier) => {
	return {
		initial: {
			list: `bg-indigo-800 dark:bg-indigo-400 border-indigo-800 dark:border-indigo-400`,
			label: `text-black dark:text-white`,
			inputContainer: `
				${modifier?.checked 
				? 'bg-indigo-950 dark:bg-indigo-200'
				: ''}	
			`,
			inputLabel: `text-indigo-200 dark:text-indigo-800`,
		},
		success: {
			list: `bg-green-800 dark:bg-green-400 border-green-800 dark:border-green-400`,
			label: `text-black dark:text-white`,
			inputContainer: `
				${modifier?.checked
				? 'bg-green-950 dark:bg-green-200'
				: ''}	
			`,
			inputLabel: `text-green-200 dark:text-green-800`,
		},
		error: {
			list: `bg-red-800 dark:bg-red-400 border-red-800 dark:border-red-400`,
			label: `text-black dark:text-white`,
			inputContainer: `
				${modifier?.checked 
				? 'bg-red-950 dark:bg-red-200'
				: ''}	
			`,
			inputLabel: `text-red-200 dark:text-red-800`,
		},
		warning: {
			list: `bg-yellow-800 dark:bg-yellow-400 border-yellow-800 dark:border-yellow-400`,
			label: `text-black dark:text-white`,
			inputContainer: `
				${modifier?.checked
				? 'bg-yellow-950 dark:bg-yellow-200'
				: ''}	
			`,
			inputLabel: `text-yellow-200 dark:text-yellow-800`,
		},
	}
};

const defaultClassNames = (variant: Variant, modifier?: Modifier) => ({
	container: 'flex gap-2 items-center',
	label: `${colorsByVariant(modifier)[variant]?.label}`,
	list: `
		 flex rounded-full p-1 gap-1
		${colorsByVariant(modifier)[variant]?.list}
	`,
	inputContainer: `
		flex py-1 px-4 
        rounded-full
        transition
		${modifier?.checked && modifier?.atomic 
            ? 'cursor-default' 
            : 'cursor-pointer'}
		${modifier?.checked 
            ? 'shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]' 
            : 'shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.25)]'}
		${colorsByVariant(modifier)[variant]?.inputContainer}
	`,
	inputLabel: `
		flex flex-none select-none font-semibold leading-6
		${colorsByVariant(modifier)[variant]?.inputLabel}
	`,
	input: `hidden`,
});

interface RadioInputProps extends BruteComponent<
    HTMLInputElement,
    ['container', 'label', 'input']
> {
    variant?: Variant;
    label?: React.ReactNode;
    switchOnAnyClick?: boolean;
    checked?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({
	classNames,
	variant = 'initial',
	label,
	switchOnAnyClick,
	checked,
	...inputProps 
}) => {
	const id = useId();

	const modifier = { checked: !!checked, atomic: !switchOnAnyClick };

	const containerClassName = classNames?.overwriteContainer ?? `${defaultClassNames(variant, modifier)?.inputContainer} ${classNames?.label ?? ''}`;
	const labelClassName = classNames?.overwriteLabel ?? `${defaultClassNames(variant, modifier)?.inputLabel} ${classNames?.label ?? ''}`;
    const inputClassName = classNames?.overwriteInput ?? `${defaultClassNames(variant, modifier)?.input} ${classNames?.input ?? ''}`;

	return (
		<label className={containerClassName} htmlFor={id}>
			<span className={labelClassName}>
				{label}
			</span>
			<input 
				{...inputProps}
				className={inputClassName}
				type='radio'
				id={id}
				checked={checked}
			/>
		</label>
	);
}

interface SwitcherProps<T extends string> extends BruteComponent<
    HTMLInputElement,
    ['container', 'label', 'list', 'inputContainer', 'inputLabel', 'input']
> {
	variant?: Variant;
	label?: React.ReactNode;
	options: T[] | readonly T[];
	switchOnAnyClick?: boolean;
	switchDirection?: 'left' | 'right';
    onClick?: (event: React.SyntheticEvent) => void;
    optionChecked: T;
    setOptionChecked: (option: T) => void,
}

const Switcher = <T extends string,>({
	classNames,
	variant = 'initial',
	label = 'Pick an option',
    options,
	switchOnAnyClick = true,
	switchDirection = 'right',
	onClick,
    optionChecked,
    setOptionChecked,
	...inputProps
}: SwitcherProps<T>): JSX.Element => {
	const id = useId();

	const containerClassName = classNames?.overwriteContainer ?? `${defaultClassNames(variant)?.container} ${classNames?.container ?? ''}`;
	const listClassName = classNames?.overwriteList ?? `${defaultClassNames(variant)?.list} ${classNames?.list ?? ''}`;
	const labelClassName = classNames?.overwriteLabel ?? `${defaultClassNames(variant)?.label} ${classNames?.label ?? ''}`;

	return (
		<div 
		className={containerClassName} 
		>
			{typeof label === 'string' ? <span className={labelClassName}>{label}</span> : label ?? ''}
			<div 
			className={listClassName}
			onClick={(event) => {
				if (switchOnAnyClick) {
					event.preventDefault();
					const currentIndex = options.findIndex((opt) => opt === optionChecked);
					const nextIndex = switchDirection === 'left'
						? currentIndex === 0 ? options.length - 1 : currentIndex - 1
						: currentIndex === options.length - 1 ? 0 : currentIndex + 1;
					const nextValue = options[nextIndex];
					setOptionChecked(nextValue);
				}
			
				if (event.currentTarget.tagName === 'DIV' && 
					event.type === 'click' &&
					onClick) {
					event.preventDefault();
					onClick?.(event);
				}
			}}
			>
				{options.map((opt, key) => {
                    return (
                        <RadioInput
                        {...inputProps}
                        classNames={{
                            container: classNames?.inputContainer,
                            overwriteContainer: classNames?.overwriteInputContainer,
                            label: classNames?.inputLabel,
                            overwriteLabel: classNames?.overwriteInputLabel,
                            input: classNames?.input,
                            overwriteInput: classNames?.overwriteInput,
                        }}
                        name={id}
                        key={key}
                        label={opt}
                        value={opt}
                        variant={variant}
                        checked={optionChecked === opt}
                        switchOnAnyClick={switchOnAnyClick}
                        onChange={(event) => {
                            if (!switchOnAnyClick)
                                setOptionChecked(opt)
                            inputProps.onChange?.(event)
                        }}
                        />
                    );
				})}
			</div>
		</div>
	);
};

export default Switcher;
