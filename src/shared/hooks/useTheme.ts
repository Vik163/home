import { ThemeContext } from "../context/themeContext";

import { useContext } from "react";
import { themes, Themes } from "../constants/theme/themes";
import { storage } from "../storage/storage";
import { Theme, ThemeScheme } from "../types/theme";

interface UseThemeResult {
  themeScheme: ThemeScheme;
  toggleTheme: (saveAction?: (theme: ThemeScheme) => void) => void;
  theme: Theme;
}

// Создаем пользовательский hook
// Получаем из контекста данные, описываем логику
// Возвращаем объект и сохраняем тему в Storage
export function useTheme(): UseThemeResult {
  const { themeScheme, setTheme, theme } = useContext(ThemeContext);
  let newThemeData = theme;
  const toggleTheme = (saveAction?: (theme: ThemeScheme) => void) => {
    let newTheme: ThemeScheme;
    switch (themeScheme) {
      case Themes.DARK:
        newTheme = Themes.LIGHT;
        newThemeData = themes.light;
        break;

      case Themes.LIGHT:
        newTheme = Themes.DARK;
        newThemeData = themes.dark;
        break;

      default:
        newTheme = Themes.LIGHT;
        newThemeData = themes.light;
    }

    setTheme?.(newTheme);
    storage.setItem("themeScheme", newTheme);

    saveAction?.(newTheme);
  };

  return {
    theme: newThemeData || themes.light,
    themeScheme: themeScheme || Themes.LIGHT,
    toggleTheme,
  };
}
