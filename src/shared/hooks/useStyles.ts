import React from "react";
import { Theme } from "../types/theme";
import { useTheme } from "./useTheme";

type Generator<T extends {}> = (theme: Theme) => T;

export const useStyles = <T extends {}>(fun: Generator<T>) => {
  const { theme } = useTheme();
  // console.log("theme:", theme);
  const styles = React.useMemo(() => fun(theme!), [theme]);
  return { styles, theme };
};
