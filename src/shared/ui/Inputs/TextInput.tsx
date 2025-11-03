import { useStyles } from "@/shared/hooks/useStyles";
import { fluidSize } from "@/shared/lib/fluidLayout";
import { Fonts, FontSizes, FontWeights } from "@/shared/types/fonts";
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
  (
    font: {
      weight?: FontWeights;
      lineHeight?: number;
      size?: FontSizes;
    } & Fonts
  ) =>
  (theme: Theme) => {
    let lineHeight = font.lineHeight;
    const fontSizes = font.fontSizes!;
    const fontNames = font.fontNames!;

    if (lineHeight) {
      lineHeight = lineHeight * fontSizes[font.size ?? "medium"];
    }
    return StyleSheet.create({
      container: {
        lineHeight,
        height: fluidSize(40),
        includeFontPadding: false,
        textAlignVertical: "center",
        fontFamily: fontNames.roboto[font.weight ?? "medium"],
        fontSize: fontSizes.medium,
        color: theme.colors.text,
      },
    });
  };
