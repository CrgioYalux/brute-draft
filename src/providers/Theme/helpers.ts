import type { Theme } from "./types";

function getSystemTheme(): Theme.Value {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) return 'dark';
    return 'light';
}

function getSavedTheme(): Theme.Value | null {
    const theme = localStorage.getItem('theme');
    if (!theme) return null;
    return theme as Theme.Value;
}

function applyTheme(theme: Theme.Value): void {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
}

export { getSystemTheme, getSavedTheme, applyTheme };
