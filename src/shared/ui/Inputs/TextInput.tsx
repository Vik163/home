import { FontFamily, FontSizes, FontWeights } from "@/shared/constants/fonts";
import { useStyles } from "@/shared/hooks/useStyles";
import { fluidSize } from "@/shared/lib/fluidLayout";
import { Colors, Theme } from "@/shared/types/theme";
import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

export interface InputProps {
  width?: number | string;
  height?: number | string;
  flex?: number;
  size?: FontSizes;
  weight?: FontWeights;
  lineHeight?: number;
  color?: Colors;
  placeholderTextColor?: string;
  multiline?: boolean;
  family?: FontFamily;
}

export const TextInput = forwardRef<RNTextInput, InputProps & TextInputProps>(
  (props, ref) => {
    const { styles, theme } = useStyles(createStyles({ weight: props.weight }));

    return (
      <RNTextInput
        {...props}
        ref={ref}
        placeholderTextColor={props.placeholderTextColor ?? theme?.colors.text}
        style={styles.container}
      />
    );
  }
);

const createStyles =
  (font: {
    weight?: FontWeights;
    lineHeight?: number;
    size?: FontSizes;
    family?: FontFamily;
  }) =>
  (theme: Theme) => {
    let lineHeight = font.lineHeight;
    const fontSizes = font.size!;
    const fontNames = font.family!;

    if (lineHeight) {
      lineHeight = lineHeight * fontSizes;
    }
    return StyleSheet.create({
      container: {
        lineHeight,
        height: fluidSize(40),
        includeFontPadding: false,
        textAlignVertical: "center",
        fontFamily: fontNames,
        fontSize: fontSizes,
        color: theme.colors.text,
      },
    });
  };
