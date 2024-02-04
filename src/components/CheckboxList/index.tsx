import { useState, useId } from 'react';

function CheckboxList<T extends MinimumItemProps>(props: CheckboxListProps<T>): React.ReactNode {
    const id = useId();
    if (props.stateful) return <StatefulCheckboxList {...props} htmlFor={`${id}-${props.htmlFor}`} />
    return <StatelessCheckboxList {...props} htmlFor={`${id}-${props.htmlFor}`} />
}

function StatefulCheckboxList<T extends MinimumItemProps>({
    className,
    htmlFor,
    list,
    renderItemAs,
    maxSelected = list.length,
    select,
    selectUsing,
}: Omit<CheckboxListProps<T> & StatefulCheckboxListProps<T>, 'stateful'>): React.ReactNode {
    const selectsLeft = maxSelected !== list.filter((v) => v[selectUsing] === true).length;

    return (
        <div className={`${className}`}>
            {list.map((item) => {
                const isSelected = !!selectUsing && list.find(({ id }) => id === item.id)?.[selectUsing];
                const identifier = `${htmlFor}-item-${item.id}`;

                return (
                    <label 
		    htmlFor={identifier}
		    key={item.id}
		    >
                        <input
                        className=''
                        type='checkbox'
                        name={htmlFor}
                        id={identifier}
                        onChange={() => {
                            if (!isSelected && !selectsLeft) return;

                            select((items) => items.map((v) => {
                                if (v.id === item.id && !!selectUsing) {
                                    const value = v[selectUsing];
                                    const selected = typeof value === 'boolean' ? !value : null;

                                    if (selected === null) return v;

                                    return { ...v, [selectUsing]: selected };
                                }
                                return v;
                            }));
                        }}
                        disabled={!isSelected && !selectsLeft}
                        checked={!!isSelected}
                        />
                        {!!renderItemAs ? renderItemAs(item) : <span>{item.name}</span>}
                    </label>
                );
            })}
        </div>
    );
};

function StatelessCheckboxList<T extends MinimumItemProps>({
    className,
    htmlFor,
    list,
    renderItemAs,
    maxSelected,
    defaultSelected = [],
}: Omit<CheckboxListProps<T> & StatelessCheckboxListProps<T>, 'stateful'>): React.ReactNode {
    const [selected, setSelected] = useState<Array<T>>(defaultSelected);
    const selectsLeft = maxSelected !== selected.length;

    return (
        <div className={`${className}`}>
            {list.map((item) => {
                const isSelected = !!(selected.find(({ id }) => id === item.id));
                const identifier = `${htmlFor}-item-${item.id}`;

                return (
                    <label 
		    htmlFor={identifier}
		    key={item.id}
		    >
                        <input
                        className=''
                        type='checkbox'
                        name={htmlFor}
                        id={identifier}
                        onChange={() => {
                            if (!isSelected && !selectsLeft) return;
                            if (!isSelected)
                                setSelected((items) => [...items, item]);
                            else 
				setSelected((items) => items.filter(({ id }) => id !== item.id));
                        }}
                        disabled={!isSelected && !selectsLeft}
                        checked={isSelected}
                        />
                        {!!renderItemAs ? renderItemAs(item) : <span>{item.name}</span>}
                    </label>
                );
            })}
        </div>
    );
};

export default CheckboxList;
