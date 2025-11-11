import {
  stateHomeGroupTopics,
  StateHomeTopics,
} from "@/shared/constants/mqttTopics";
import { useEffectMount } from "@/shared/hooks/useEffectMount";
import { client, mqttConnect } from "@/shared/lib/mqttBroker";
import { HomeStateTopics } from "@/shared/types/topics";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { useState } from "react";
import { StyleSheet } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  const [temp, setTemp] = useState("0");
  const [humd, setHumd] = useState("0");
  useEffectMount(() => mqttConnect(stateHomeGroupTopics), []);

  async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString;
    const key = message.destinationName
      .split("/")
      .slice(-1)[0] as HomeStateTopics;

    switch (key) {
      case StateHomeTopics.TEMP:
        setTemp(value);
        break;
      case StateHomeTopics.HUMD:
        setHumd(value);
        break;

      default:
        console.log("Error:");
    }

    console.log("key:", key);
    console.log("topic:" + message.destinationName);
    console.log("value:" + message.payloadString);
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <IndicationModule title="Температура в доме" value={temp} />
      <IndicationModule title="Напряжение" value={humd} />
      <IndicationModule title="Сила тока" value="humidity" />
      <IndicationModule title="Частота" value="humidity" />
      <IndicationModule title="Мощность" value="humidity" />
      <IndicationModule title="Энергия" value="humidity" />
      <UI.TextButton
        title={"Обновить"}
        fontSize={20}
        // onPress={() => getAllKeys()}
      />

      <UI.TextButton
        title={"Отключить"}
        fontSize={20}
        onPress={() => client.disconnect()}
      />
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
