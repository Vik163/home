import React from "react";
import { useColorScheme } from "react-native";
import { themes, Themes } from "../constants/theme/themes";
import { Theme, ThemeScheme } from "../types/theme";

type Generator<T extends {}> = (theme: Theme) => T;

export const useStyles = <T extends {}>(fun: Generator<T>) => {
  const colorScheme = useColorScheme() ?? "light";
  let theme: Theme;
  let themeScheme: ThemeScheme;

  if (colorScheme === "dark") {
    themeScheme = Themes.DARK;
    theme = themes.dark;
  } else {
    themeScheme = Themes.LIGHT;
    theme = themes.light;
  }

  const styles = React.useMemo(() => fun(theme!), [theme]);
  return { styles, theme, themeScheme };
};
