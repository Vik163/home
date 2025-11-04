import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { StyleSheet } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  return (
    <UI.Container addStyles={styles.container}>
      <IndicationModule title="Температура в доме" />
      <IndicationModule title="Напряжение" />
      <IndicationModule title="Сила тока" />
      <IndicationModule title="Частота" />
      <IndicationModule title="Мощность" />
      <IndicationModule title="Энергия" />
    </UI.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
