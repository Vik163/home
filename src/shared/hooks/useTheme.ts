import React from "react";
import { ThemeContext } from "../context/themeContext";

export const useTheme = () => React.useContext(ThemeContext);
