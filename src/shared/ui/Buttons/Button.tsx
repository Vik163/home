import { useStyles } from "@/shared/hooks/useStyles";
import { Colors, Theme } from "@/shared/types/theme";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Font } from "../Font/Font";

type Styles = ViewStyle | TextStyle | ImageStyle;

export interface ButtonProps {
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  active?: boolean;
  fontColor?: Colors;
  fontSize?: number;
  icon?: number;
  sizeIcon?: number;
  stylesBtn: Styles;
  reverse?: boolean;
}

/**
 * Кнопка с иконкой (.jpeg или .png) и текстом
 * @param title - текс
 * @param loading - отображение загрузки
 * @param disabled - отключение
 * @param active -
 * @param fontColor
 * @param fontSize
 * @param icon - импортированное изображение
 * @param sizeIcon - размер иконки
 * @param stylesBtn - стили
 * @param reverse - меняет местами иконку и текст
 */

export function Button(props: ButtonProps & TouchableOpacityProps) {
  const { title, loading, disabled, icon, sizeIcon, stylesBtn, reverse } =
    props;
  const { styles, theme } = useStyles(createStyles(stylesBtn!, reverse));

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={styles.container as StyleProp<ViewStyle>}
      {...props}
    >
      <View style={styles.view as StyleProp<ViewStyle>}>
        {icon && (
          <Image style={{ width: sizeIcon, height: sizeIcon }} source={icon} />
        )}
        {title &&
          (loading ? (
            <ActivityIndicator testID="loading" />
          ) : (
            <Font
              weight={700}
              color={props.fontColor ?? "text"}
              size={props.fontSize}
              alignCenter
            >
              {title ?? ""}
            </Font>
          ))}
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (styles: Styles, reverse?: boolean) => (theme: Theme) => {
  return StyleSheet.create({
    container: styles,
    view: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: reverse ? "row-reverse" : "row",
      width: "100%",
      height: "100%",
      gap: styles.gap,
    },
  });
};
