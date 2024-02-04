import type { Theme } from './types';

import { createContext, useContext, useState } from 'react';
import { getSystemTheme, applyTheme, getSavedTheme } from './helpers';

const Context = createContext<Theme.Context>({} as Theme.Context);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [theme, setTheme] = useState<Theme.Value>(() => {
        const preferredTheme = getSavedTheme() ?? getSystemTheme();
	applyTheme(preferredTheme);
	return preferredTheme;
    });

    const switchTheme = (): void => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        setTheme(newTheme);
    };

    const value: Theme.Context = [
	{
	    current: theme,
	    opposite: theme === 'dark' ? 'light' : 'dark',
	},
	switchTheme
    ];

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};

export default ThemeContextProvider;
export const useTheme = () => useContext<Theme.Context>(Context);
