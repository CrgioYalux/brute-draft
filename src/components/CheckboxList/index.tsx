import { useState, useId } from 'react';

interface CheckboxTypeInputListProps {
    classNames?: ClassNames<['container', 'input']>;
    id: string;
    htmlFor?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (event: React.SyntheticEvent) => void;
    children?: React.ReactNode;
};

type StatefulCheckboxListProps<T extends MinimumItemProps> = {
    stateful: true;
    select: (cb: (items: T[]) => T[]) => void;
    selectUsing: KeysForBooleanValues<T>;
};

type StatelessCheckboxListProps<T extends MinimumItemProps> = {
    stateful?: false;
    defaultSelected?: T[];
};

type CheckboxListProps<T extends MinimumItemProps> = {
    classNames?: ClassNames<['container', 'label', 'input', 'item']>;
    htmlFor: string;

    list: T[];

    onChange?: (prev: T[], curr: T[], item: T) => void;
    renderItemAs?: (item: T) => React.ReactNode;
    maxSelected?: number;
} & (StatefulCheckboxListProps<T> | StatelessCheckboxListProps<T>);

function CheckboxList<T extends MinimumItemProps>(props: CheckboxListProps<T>): React.ReactNode {
    const id = useId();
    const htmlFor = `${id}-${props.htmlFor}`;
    if (props.stateful) return <StatefulCheckboxList {...props} htmlFor={htmlFor} />
    return <StatelessCheckboxList {...props} htmlFor={htmlFor} />
}

function CheckboxTypeInputList({
    classNames = { container: '', input: '' },
    id,
    htmlFor,
    disabled = false,
    checked = false,
    onChange,
    children,
}: CheckboxTypeInputListProps): React.ReactNode {
    return (
        <label
        className={!!classNames?.overwriteContainer ? classNames.overwriteContainer : `flex gap-2 items-center ${classNames?.container}`}
        htmlFor={id}
        >
            <input
            className={!!classNames?.overwriteInput ? classNames.overwriteInput : `${classNames.input}`}
            type='checkbox'
            name={htmlFor}
            id={id}
            onChange={(e) => onChange?.(e)}
            disabled={disabled}
            checked={checked}
            />
            {children}
        </label>
    );
}

function StatefulCheckboxList<T extends MinimumItemProps>({
    classNames,
    htmlFor,
    list,
    renderItemAs,
    onChange,
    maxSelected = list.length,
    select,
    selectUsing,
}: Omit<CheckboxListProps<T> & StatefulCheckboxListProps<T>, 'stateful'>): React.ReactNode {
    const selectsLeft = maxSelected !== list.filter((v) => v[selectUsing] === true).length;

    return (
        <div className={!!classNames?.overwriteContainer ? classNames.overwriteContainer : `flex flex-col gap-2 ${classNames?.container}`}>
            {list.map((item) => { 
                const isSelected = !!(!!selectUsing && list.find(({ id }) => id === item.id)?.[selectUsing]);

                return (
                    <CheckboxTypeInputList
                    key={item.id}
                    classNames={{ 
                        container: classNames?.label,
                        overwriteContainer: classNames?.overwriteLabel,
                        input: classNames?.input,
                        overwriteInput: classNames?.overwriteInput,
                    }}
                    id={`${htmlFor}-item-${item.id}`}
                    htmlFor={htmlFor}
                    checked={isSelected}
                    disabled={!isSelected && !selectsLeft}
                    onChange={() => {
                        if (!isSelected && !selectsLeft) return;

                        const change = list.map((v) => {
                            if (v.id === item.id && !!selectUsing) {
                                const value = v[selectUsing];
                                const selected = typeof value === 'boolean' ? !value : null;

                                if (selected === null) return v;

                                return { ...v, [selectUsing]: selected, };
                            }
                            return v;
                        });

                        onChange?.(list, change, item);

                        select(() => change);
                    }}
                    >
                        {!!renderItemAs 
                            ? renderItemAs(item) 
                            : <span className={!!classNames?.overwriteItem ? classNames.overwriteItem : `font-bold ${classNames?.item}`}>{item.name}</span>}
                    </CheckboxTypeInputList>
                );
            })}
        </div>
    );
};

function StatelessCheckboxList<T extends MinimumItemProps>({
    classNames,
    htmlFor,
    list,
    renderItemAs,
    onChange,
    maxSelected,
    defaultSelected = [],
}: Omit<CheckboxListProps<T> & StatelessCheckboxListProps<T>, 'stateful'>): React.ReactNode {
    const [selected, setSelected] = useState<Array<T>>(defaultSelected);
    const selectsLeft = maxSelected !== selected.length;

    return (
        <div className={!!classNames?.overwriteContainer ? classNames.overwriteContainer : `flex flex-col gap-2 ${classNames?.container}`}>
            {list.map((item) => {
                const isSelected = !!(selected.find(({ id }) => id === item.id));

                return (
                    <CheckboxTypeInputList
                    key={item.id}
                    classNames={{ 
                        container: classNames?.label,
                        overwriteContainer: classNames?.overwriteLabel,
                        input: classNames?.input,
                        overwriteInput: classNames?.overwriteInput,
                    }}
                    id={`${htmlFor}-item-${item.id}`}
                    htmlFor={htmlFor}
                    checked={isSelected}
                    disabled={!isSelected && !selectsLeft}
                    onChange={() => {
                        if (!isSelected && !selectsLeft) return;

                        const change = isSelected ? selected.filter(({ id }) => id !== item.id) : [...selected, item];
                        
                        onChange?.(selected, change, item);

                        setSelected(change);
                    }}
                    >   
                        {!!renderItemAs 
                            ? renderItemAs(item) 
                            : <span className={!!classNames?.overwriteItem ? classNames.overwriteItem : `font-bold ${classNames?.item}`}>{item.name}</span>}
                    </CheckboxTypeInputList>
                );
            })}
        </div>
    );
};

export default CheckboxList;
