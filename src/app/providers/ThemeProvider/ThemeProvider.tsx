import { themes } from "@/shared/constants/theme/themes";
import { ThemeContext } from "@/shared/context/themeContext";
import { storage } from "@/shared/storage/storage";
import { ThemeScheme } from "@/shared/types/theme";
import React, { memo, useEffect, useMemo, useState } from "react";
import { ColorSchemeName } from "react-native";

interface Props {
  initial?: ColorSchemeName;
  children?: React.ReactNode;
}

const ThemeProvider = memo<Props>((props) => {
  const { initial, children } = props;
  const [theme, setTheme] = useState<ThemeScheme>("light");

  useEffect(() => {
    const getCurrentTheme = async () => {
      const themeScheme = await storage?.getItem("themeScheme");

      setTheme(initial || themeScheme || "light");
    };
    getCurrentTheme();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      themeScheme: theme,
      theme: themes[theme],
      setTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={memoizedValue}>
      {children}
    </ThemeContext.Provider>
  );
});

export default ThemeProvider;
