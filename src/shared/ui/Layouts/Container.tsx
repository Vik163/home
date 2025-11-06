import bgDark from "@/shared/assets/images/bg-dark.jpg";
import bgLight from "@/shared/assets/images/bg-light.jpg";
import { useStyles } from "@/shared/hooks/useStyles";
import { Styles } from "@/shared/types/styles";
import { Theme } from "@/shared/types/theme";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  addStyles?: Styles;
  bgImage?: boolean;
  // bgImage?: ImageSourcePropType;
}

export function Container(props: ContainerProps) {
  const { children, addStyles, bgImage } = props;

  const { styles, themeScheme } = useStyles(createStyles(addStyles!));
  return bgImage ? (
    <ImageBackground
      source={themeScheme === "dark" ? bgDark : bgLight}
      resizeMode="cover"
      style={styles.container}
    >
      {children}
    </ImageBackground>
  ) : (
    <View style={styles.container}>{children}</View>
  );
}

const createStyles = (style?: Styles) => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      gap: style?.gap || "unset",
      alignItems: style?.alignItems,
      justifyContent: style?.justifyContent,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
  });
};
