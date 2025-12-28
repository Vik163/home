import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import { StyleSheet, Text, View } from "react-native";

interface StatItemProps {
  itemData: number[];
  title: string;
}

export default function StatItem(props: StatItemProps) {
  const { itemData, title } = props;
  const { styles, theme } = useStyles(createStyles());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {itemData.map((d, i) => (
        <Text style={styles.num} key={i}>
          {itemData[itemData.length - i - 1]} {/* разворачиваю массив */}
        </Text>
      ))}
    </View>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: 5,
      gap: 5,
    },
    num: {
      width: 45,
      fontSize: 16,
      color: theme.colors.yellow,
      borderColor: theme.colors.border,
      borderWidth: 1,
      textAlign: "center",
      borderRadius: 4,
    },
    title: {
      width: "100%",
      textAlign: "center",
      fontSize: 18,
      color: theme.colors.yellow,
      marginBottom: 5,
    },
  });
};
