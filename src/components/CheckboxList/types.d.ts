type MinimumItemProps = {
    id: number;
    name: string;
} & Record<string, unknown>;

type KeysForBooleanValues<T> = {
    [K in keyof T]: T[K] extends boolean ? K : 'no boolean prop'
}[keyof T];

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
    className?: string;
    htmlFor: string;

    list: T[];

    renderItemAs?: (item: T) => React.ReactNode;
    maxSelected?: number;
} & (StatefulCheckboxListProps<T> | StatelessCheckboxListProps<T>);

