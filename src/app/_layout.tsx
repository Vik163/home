import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import StatusProvider from "./providers/StatusProvider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  //* Получить настройки с сервера
  const [loaded, error] = useFonts({
    SofiaSans: require("../shared/assets/fonts/SofiaSans-Black.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    // <ThemeProvider initial={colorScheme}>
    <StatusProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ headerShown: false }} />
      </Stack>
      <StatusBar hidden />
    </StatusProvider>
    // </ThemeProvider>
  );
}
