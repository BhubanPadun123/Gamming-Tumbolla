import React, { useMemo, useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  Provider as PaperProvider,
  ToggleButton,
} from 'react-native-paper'
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native'
import { ThemeContext } from './src/context/ThemeContext'
import AppNavigator from './src/Navbar'
import { AppState } from 'react-native'
import { navigationRef, resetToSplash, printNavigationStack } from './src/Navbar/navHook'
import ws from "./src/Websocket/websocket"
import { Storage } from './src/types/localStorage'

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const appState = AppState.currentState

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: any) => {
      try {
        const user = await Storage.getUser();

        if (user) {
          if (nextAppState === 'active') {
            ws.connect(user.id)
            ws.addCallbacks("AUTH",(data)=>{
              console.log(data)
            })
          } else if (nextAppState === 'background' || nextAppState === 'inactive') {
            ws.disconnect(user.id);
          }

        }
        resetToSplash()
      } catch (error) {
        console.log("AppState Error:", error)
      }
    }

    const subscription = AppState.addEventListener('change', handleAppStateChange)
    return () => {
      subscription.remove()
    }
  }, [])


  const theme = useMemo(
    () => (isDarkTheme ? MD3DarkTheme : MD3LightTheme),
    [isDarkTheme]
  )
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  })

  const paperTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme
  const navigationTheme = isDarkTheme ? DarkTheme : LightTheme
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev)
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme
      }}
    >
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme} ref={navigationRef} >
          <SafeAreaView
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <AppNavigator />

            <ToggleButton
              style={styles.themeToggle}
              icon={isDarkTheme ? 'weather-sunny' : 'weather-night'}
              value="theme"
              status={isDarkTheme ? 'checked' : 'unchecked'}
              onPress={() => setIsDarkTheme((prev) => !prev)}
            />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 999,
  },
})