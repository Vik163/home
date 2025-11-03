import React from "react";

import { themes } from "../constants/theme/themes";
import { Theme, ThemeScheme } from "../types/theme";

interface ProvidedValue {
  themeScheme: ThemeScheme;
  theme: Theme;
  setTheme?: (newTheme: ThemeScheme) => void;
}

export const ThemeContext = React.createContext<ProvidedValue>({
  themeScheme: "light",
  theme: themes.light,
});
