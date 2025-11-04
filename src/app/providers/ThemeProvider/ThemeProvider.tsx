import { themes } from "@/shared/constants/theme/themes";
import { ThemeContext } from "@/shared/context/themeContext";
import { storage } from "@/shared/storage/storage";
import { ThemeScheme } from "@/shared/types/theme";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

interface Props {
  initial?: ThemeScheme;
  children?: React.ReactNode;
}

const ThemeProvider = memo<Props>((props) => {
  const { initial, children } = props;
  const [theme, setTheme] = useState<ThemeScheme>("light");
  const colorScheme = useColorScheme();

  useEffect(() => {
    const getCurrentTheme = async () => {
      const themeScheme = await storage?.getItem("themeScheme");

      setTheme(initial || themeScheme || colorScheme || "light");
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
