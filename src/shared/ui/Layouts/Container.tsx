import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const { styles } = useStyles(createStyles());
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const createStyles = () => (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.card,
    },
  });
