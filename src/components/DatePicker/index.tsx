import './DatePicker.css';

import {
	useId,
	useEffect,
} from 'react';

import {
	getCurrentDateToJSON,
	formatDateToUseAsPropValue,
} from '../utils';

const colorsByVariant: ColorSchemesByVariant<['span', 'input', 'button']> = {
	initial: {
		span: 'text-black dark:text-white',
		input: 'bg-indigo-800 dark:bg-indigo-200 text-indigo-200 dark:text-indigo-800',
        button: 'text-indigo-800 dark:text-indigo-200',
	},
	success: {
		span: 'text-black dark:text-white',
		input: 'bg-green-800 dark:bg-green-200 text-green-200 dark:text-green-800',
        button: 'text-green-800 dark:text-green-200',
	},
	error: {
		span: 'text-black dark:text-white ',
		input: 'bg-red-800 dark:bg-red-200 text-red-200 dark:text-red-800',
        button: 'text-red-800 dark:text-red-200',
	},
	warning: {
		span: 'text-black dark:text-white',
		input: 'bg-yellow-800 dark:bg-yellow-200 text-yellow-200 dark:text-yellow-800',
        button: 'text-yellow-800 dark:text-yellow-200',
	},
};

const defaultClassNames = (variant: Variant) => ({
	label: 'DatePicker flex items-center gap-2',
	span: `flex-none grow-0 min-w-max ${colorsByVariant[variant]?.span}`,
	input: `flex-none rounded p-1 ${colorsByVariant[variant]?.input}`,
	button: `w-max ${colorsByVariant[variant]?.button} underline cursor-pointer`,
});

interface DatePickerProps extends BruteComponent<
	HTMLInputElement,
	['label', 'span', 'input', 'button']
> {
	label?: React.ReactNode;
	variant?: Variant;
	defaultValueToCurrentDate?: boolean;
    setToCurrentButton?: boolean;
    setToCurrentButtonText?: string;
	setDate: (prev: string) => void;
	date: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
	classNames,
	label = 'Date',
	variant = 'initial',
	defaultValueToCurrentDate = false,
    setToCurrentButton = true,
    setToCurrentButtonText = 'Today',
	setDate,
	date,
	...inputProps 
}) => {
	const id = useId();

	const labelClassName = classNames?.overwriteLabel ?? `${defaultClassNames(variant)?.label} ${classNames?.label ?? ''}`;
	const spanClassName = classNames?.overwriteSpan ?? `${defaultClassNames(variant)?.span} ${classNames?.span ?? ''}`;
	const inputClassName = classNames?.overwriteInput ?? `${defaultClassNames(variant)?.input} ${classNames?.input ?? ''}`;
	const buttonClassName = classNames?.overwriteButton ?? `${defaultClassNames(variant)?.button} ${classNames?.button ?? ''}`;

    const setDateToCurrent = (): void => {
        setDate(getCurrentDateToJSON());
    };

	useEffect(() => {
		if (defaultValueToCurrentDate)
			setDateToCurrent();
	}, [defaultValueToCurrentDate]);

	return (
		<label className={labelClassName} htmlFor={id}>
			<span className={spanClassName}>
				{label}
			</span>
			<input 
				{...inputProps}
				className={inputClassName}
				type='date'
				id={id}
				value={!date ? '' : formatDateToUseAsPropValue(date)}
				onChange={(event) => {
					if (!event.target['validity'].valid) return;
					const attemptedDate = event.target['value'];
					setDate(attemptedDate);
					inputProps.onChange?.(event);
				}}
			/>
			    {setToCurrentButton 
				? (
					<button
					className={buttonClassName}
					onClick={setDateToCurrent}
					>{setToCurrentButtonText}</button>
				)
				: ''}
		</label>
	);
};

export default DatePicker;
