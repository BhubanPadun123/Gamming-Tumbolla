import React, { createContext, useContext } from 'react'

export interface ThemeContextType {
    isDarkTheme: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    isDarkTheme: false,
    toggleTheme: () => { },
})

export const useAppTheme = () => useContext(ThemeContext)