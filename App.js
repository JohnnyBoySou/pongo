import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, LogBox, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Router from './src/router';
import light from './src/theme/light';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { OneSignal } from 'react-native-onesignal';

preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {

    async function loadResourcesAndDataAsync() {
      try {
        await Font.loadAsync({
          Font_Book: require('./assets/fonts/Inter_Book.ttf'),
          Font_Medium: require('./assets/fonts/Inter_Medium.ttf'),
          Font_Bold: require('./assets/fonts/Inter_Bold.ttf'),
          Font_Black: require('./assets/fonts/Inter_Black.ttf'),
          Voyage_Medium: require('./assets/fonts/Voyage_Medium.otf'),
          Voyage_Book: require('./assets/fonts/Voyage_Book.otf'),
          TimesNewRoman: require('./assets/fonts/Times_Roman.ttf'),
          TimesNewRoman_Bold: require('./assets/fonts/Times_Roman_Bold.ttf'),
        });
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      }
    }
    loadResourcesAndDataAsync();

    const handlePermission = async () => {
      LogBox.ignoreAllLogs(true);
      const key = process.env.EXPO_PUBLIC_KEY || Constants.expoConfig.extra.oneSignalAppId
      if (key != null) {
        OneSignal.initialize(key);
      }

      let { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        status = newStatus;
        console.log('status', status)
      }
      if (status !== 'granted') {
        console.log('permitido')
      }
    }

    handlePermission()
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
    <View style={{ flex: 1, backgroundColor: light.background }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={light}>
        <StatusBar translucent style="dark"/>
        <Router />
      </ThemeProvider>
    </View>
  );
}
