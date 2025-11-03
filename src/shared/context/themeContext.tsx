import React from "react";

import { themes } from "../constants/theme/themes";
import { Theme } from "../types/theme";

interface ProvidedValue {
  themeScheme: "light" | "dark";
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ProvidedValue>({
  themeScheme: "light",
  theme: themes.light,
  toggleTheme: () => {
    // eslint-disable-next-line no-console
    console.log("ThemeProvider is not rendered!");
  },
});
