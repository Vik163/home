import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "@/shared/hooks/useTheme";
import { useEffect } from "react";
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  //* Получить настройки с сервера
  const { themeScheme } = useTheme();
  const [loaded, error] = useFonts({
    Alegreya: require("../shared/assets/fonts/Alegreya-Black.ttf"),
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
    <ThemeProvider initial={themeScheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar hidden />
    </ThemeProvider>
  );
}
