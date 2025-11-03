import { useStyles } from "@/shared/hooks/useStyles";
import {
  FontFamily,
  Fonts,
  FontSizes,
  FontWeights,
} from "@/shared/types/fonts";
import { Colors, Theme } from "@/shared/types/theme";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface FontProps {
  size?: FontSizes;
  family?: FontFamily;
  weight?: FontWeights;
  lineHeight?: number;
  color?: Colors;
  children?: React.ReactNode;
  underline?: boolean;
  alignCenter?: boolean;
  textAlign?: "left" | "auto" | "center" | "right" | "justify";
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
  devMode?: boolean;
}

export function Font(props: FontProps & TextProps & Fonts) {
  const { styles } = useStyles(createStyles(props));
  return (
    <Text adjustsFontSizeToFit {...props} style={styles.container}>
      {props.devMode ? props.size : props.children}
    </Text>
  );
}

const createStyles = (font: FontProps & Fonts) => (theme: Theme) => {
  let lineHeight = font.lineHeight;
  const fontSizes = font.fontSizes!;
  const fontNames = font.fontNames!;

  if (lineHeight) {
    lineHeight = lineHeight * fontSizes[font.size ?? "medium"];
  }
  return StyleSheet.create({
    container: {
      lineHeight,
      includeFontPadding: false,
      textAlignVertical: "center",
      fontFamily: fontNames.roboto[font.weight ?? "medium"],
      fontSize: fontSizes[font.size ?? "medium"],
      color: theme.colors[font.color ?? "text"],
    },
  });
};
