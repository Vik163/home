import { Colors } from "@/shared/constants/theme/theme";
import { useTheme } from "./useTheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const { themeScheme } = useTheme() ?? "light";
  const colorFromProps = props[themeScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[themeScheme][colorName];
  }
}
