const isIncludedIn = <T, >(list: T[] = []) => (v: T): boolean => list.includes(v);

export  { isIncludedIn };
