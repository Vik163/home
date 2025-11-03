import { themes } from "@/shared/constants/theme/themes";
import { ThemeContext } from "@/shared/context/themeContext";
import { storage } from "@/shared/storage/storage";
import { Theme } from "@/shared/types/theme";
import React from "react";

interface ProvidedValue {
  themeScheme: "light" | "dark";
  theme: Theme;
  toggleTheme: () => void;
}

interface Props {
  initial?: "light" | "dark";
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const getCurrentTheme = async () => {
      const themeScheme = await storage.getItem("themeScheme");
      setTheme(themeScheme ?? "light");
    };
    getCurrentTheme();
  }, []);

  const toggleThemeCallback = React.useCallback(() => {
    setTheme((currentTheme) => {
      let newTheme = currentTheme;
      if (currentTheme === "light") {
        newTheme = "dark";
      }
      if (currentTheme === "dark") {
        newTheme = "light";
      }
      storage.setItem("themeScheme", newTheme);
      return newTheme;
    });
  }, []);

  const memoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      themeScheme: theme,
      theme: themes[theme],
      toggleTheme: toggleThemeCallback,
    };
    return value;
  }, [theme, toggleThemeCallback]);

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {props.children}
    </ThemeContext.Provider>
  );
});

const withTheme = (Component: React.ReactNode) => (
  <ThemeProvider>{Component}</ThemeProvider>
);

export default withTheme;
