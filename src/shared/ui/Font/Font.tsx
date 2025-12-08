import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { useStyles } from "@/shared/hooks/useStyles";
import { Colors, Theme } from "@/shared/types/theme";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface FontProps {
  size?: FontSizes;
  family?: FontFamily;
  weight?: FontWeights;
  lineHeight?: number;
  color?: Colors;
  max?: boolean;
  children?: React.ReactNode;
  alignCenter?: boolean;
  textAlign?: "left" | "auto" | "center" | "right" | "justify";
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
}

export function Font(props: FontProps & TextProps) {
  const { styles } = useStyles(createStyles(props));
  return (
    <Text adjustsFontSizeToFit {...props} style={styles}>
      {props.children}
    </Text>
  );
}

const createStyles = (font: FontProps & TextProps) => (theme: Theme) => {
  let lineHeight = font.lineHeight;
  const fontSizes = font.size!;

  if (lineHeight) {
    lineHeight = lineHeight * fontSizes;
  }
  const styles = StyleSheet.create({
    container: {
      lineHeight,
      includeFontPadding: false,
      textAlignVertical: "center",
      width: font.max ? "100%" : "auto",
      fontFamily: font.family,
      fontSize: fontSizes,
      fontWeight: font.weight,
      color: theme.colors[font.color ?? "text"],
      textAlign: font.alignCenter ? "center" : font.textAlign,
      textTransform: font.textTransform,
      letterSpacing: 0.5,
    },
  });

  return { ...styles.container, ...(font.style as object) };
};
