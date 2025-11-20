import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loader() {
  const { styles, theme } = useStyles(createStyles());

  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color={theme.colors.link} />
    </View>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      position: "absolute",
      width: "120%",
      height: "120%",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      backgroundColor: theme.colors.overlay,
      opacity: 0.85,
      paddingBottom: 70,
    },
  });
};
