import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useTheme } from "@/shared/hooks/useTheme";
import ThemeProvider from "./providers/ThemeProvider/ThemeProvider";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  //* Получить настройки с сервера
  const { themeScheme } = useTheme();
  return (
    <ThemeProvider initial={themeScheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
