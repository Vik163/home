import { useStyles } from "@/shared/hooks/useStyles";
import { ArduinoData } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import StatItem from "./StatItem";

interface StatModalProps {
  data: ArduinoData;
}

export const StatModal = (props: StatModalProps) => {
  const { data } = props;
  const { styles, theme } = useStyles(createStyles());

  return (
    <View style={styles.container}>
      <StatItem title="Min U" itemData={data.min} />
      <StatItem title="Max U" itemData={data.max} />
      <StatItem title="Среднее U" itemData={data.avr} />
      <StatItem title="U < 190 / 5 секунд" itemData={data.thd} />
    </View>
  );
};

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 15,
      padding: 0,
    },
  });
};
