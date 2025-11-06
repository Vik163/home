import { FontFamily } from "@/shared/constants/fonts";
import { palette } from "@/shared/constants/theme/palette";
import { useStyles } from "@/shared/hooks/useStyles";
import { fluidSize } from "@/shared/lib/fluidLayout";
import { Colors, Theme } from "@/shared/types/theme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Font } from "../Font/Font";

export interface ButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  color?: Colors;
  textColor?: Colors;
  fontSize?: number;
  bgColor?: string;
}

export function TextButton(props: ButtonProps & TouchableOpacityProps) {
  const { styles } = useStyles(createStyles());
  return (
    <TouchableOpacity
      disabled={props.disabled || props.loading}
      activeOpacity={0.8}
      color={props.color}
      style={styles.container}
      {...props}
    >
      {props.loading ? (
        <ActivityIndicator testID="loading" />
      ) : (
        <Font
          family={FontFamily.ALEGRIA}
          color={props.textColor ?? "text"}
          size={props.fontSize}
        >
          {props.title ?? ""}
        </Font>
      )}
    </TouchableOpacity>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      height: fluidSize(44, "vertical"),
      borderRadius: fluidSize(10),
      justifyContent: "center",
      alignItems: "center",
      borderColor: palette.black,
      borderWidth: 1,
      backgroundColor: theme.colors.bgBtn,
    },
  });
};
