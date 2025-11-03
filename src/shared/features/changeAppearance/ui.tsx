import { useTheme } from "@/shared/hooks/useTheme";
import React from "react";
import { Switch } from "react-native";

function SwitcherAppearance() {
  const { themeScheme, toggleTheme } = useTheme();
  return <Switch value={themeScheme === "dark"} onChange={toggleTheme} />;
}

export default SwitcherAppearance;
