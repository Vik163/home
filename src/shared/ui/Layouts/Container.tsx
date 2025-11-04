import { useStyles } from "@/shared/hooks/useStyles";
import { Styles } from "@/shared/types/styles";
import { Theme } from "@/shared/types/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ContainerProps {
  children: React.ReactNode;
  addStyles?: Styles;
}

export function Container(props: ContainerProps) {
  const { children, addStyles } = props;
  const { styles } = useStyles(createStyles(addStyles!));
  return <View style={styles.container}>{children}</View>;
}

const createStyles = (style: Styles) => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      gap: style.gap,
      alignItems: style.alignItems,
      justifyContent: style.justifyContent,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
  });
};
