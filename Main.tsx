import * as React from 'react'
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from 'react-native-paper'
import App from './App'
import { Provider } from "react-redux"
import { store } from './src/Redux'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export default function Main() {
    return (
        <Provider store={store} >
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    )
}