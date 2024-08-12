import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, LogBox, useColorScheme, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Router from './src/router';
import light from './src/theme/light';
import dark from './src/theme/dark';

preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = useColorScheme();
  const selectTheme = theme === 'light' ? light : dark;
  useEffect(() => {
    LogBox.ignoreAllLogs(true);

    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Font_Book: require('./assets/fonts/Inter_Book.ttf'),
          Font_Medium: require('./assets/fonts/Inter_Medium.ttf'),
          Font_Bold: require('./assets/fonts/Inter_Bold.ttf'),
          Font_Black: require('./assets/fonts/Inter_Black.ttf'),
          Voyage_Medium: require('./assets/fonts/Voyage_Medium.otf'),
          Voyage_Book: require('./assets/fonts/Voyage_Book.otf'),
        });
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, paddingTop: 36, backgroundColor: selectTheme.background }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={light}>
        <StatusBar translucent />
        <Router />
      </ThemeProvider>
    </View>
  );
}
