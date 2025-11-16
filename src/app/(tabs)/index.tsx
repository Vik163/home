import internet from "@/shared/assets/images/internet.png";
import {
  stateHomeGroupTopics,
  StateHomeTopics,
} from "@/shared/constants/mqttTopics";
import { useEffectMount } from "@/shared/hooks/useEffectMount";
import { useTheme } from "@/shared/hooks/useTheme";
import { brokerConnected, client, mqttConnect } from "@/shared/lib/mqttBroker";
import { HomeStateTopics } from "@/shared/types/topics";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { useState } from "react";
import { Image, StyleSheet, Text, TextStyle, View } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  const [temp, setTemp] = useState("000.0");
  const [humd, setHumd] = useState("000.0");
  const [volt, setVolt] = useState("000.0");
  const [current, setCurrent] = useState("000.0");
  const [frequency, setFrequency] = useState("0");
  const [power, setPower] = useState("0");
  const [energy, setEnergy] = useState("0");
  const [pf, setPf] = useState("0");
  const [max, setMax] = useState("0");
  const [min, setMin] = useState("0");
  const [threshold, setThreshold] = useState("0");
  const [average, setAverage] = useState("0");
  const [status, setStatus] = useState("Нет связи с брокером");
  const { theme } = useTheme();
  useEffectMount(() => mqttConnect(stateHomeGroupTopics), []);

  const getStatus = (value: string) => {
    if (!brokerConnected()) {
      setStatus("Нет связи с брокером");
    }
    if (brokerConnected() && value === "offlin") setStatus("Нет связи с домом");
    if (brokerConnected() && value === "onlin") setStatus("Связь установлена");
  };

  async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString.slice(0, -1);
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
      case StateHomeTopics.VOLT:
        setVolt(value);
        break;
      case StateHomeTopics.CURRENT:
        setCurrent(value);
        break;
      case StateHomeTopics.FREQUENCY:
        setFrequency(value);
        break;
      case StateHomeTopics.POWER:
        setPower(value);
        break;
      case StateHomeTopics.ENERGY:
        setEnergy(value);
        break;
      case StateHomeTopics.PF:
        setPf(value);
        break;
      case StateHomeTopics.AVERAGE:
        setAverage(value);
        break;
      case StateHomeTopics.THRESHOLD:
        setThreshold(value);
        break;
      case StateHomeTopics.MAX:
        setMax(value);
        break;
      case StateHomeTopics.MIN:
        setMin(value);
        break;
      case StateHomeTopics.STATUS:
        getStatus(value);
        break;

      default:
        console.log("Error:");
    }

    // console.log("topic:" + message.destinationName);
  }

  client.onMessageArrived = onMessageArrived;

  const stylesStatusText: TextStyle = {
    width: "100%",
    textAlign: "center",
    color:
      status === "Связь установлена" ? theme.colors.active : theme.colors.error,
  };

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <View style={styles.status}>
        {status !== "Связь установлена" ? (
          <Text style={stylesStatusText}>{status}</Text>
        ) : (
          <Image style={styles.img} source={internet} />
        )}
      </View>
      <IndicationModule title="Температура" value={temp} />
      <IndicationModule title="Влажность" value={humd} />
      <IndicationModule title="Напряжение" value={volt} />
      <IndicationModule title="Сила тока" value={current} />
      <IndicationModule title="Частота" value={frequency} />
      <IndicationModule title="Мощность" value={power} />
      <IndicationModule title="Энергия" value={energy} />
      <IndicationModule title="cos φ" value={pf} />
      <IndicationModule title="U min/сутки" value={min} />
      <IndicationModule title="U max/сутки" value={max} />
      <IndicationModule title="U среднее/сутки" value={average} />
      <IndicationModule title="U < 190 ч/сутки" value={threshold} />

      <UI.TextButton
        title={"Обновить"}
        fontSize={20}

        // onPress={() => getAllKeys()}
      />
    </UI.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    rowGap: 18,
    columnGap: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    width: "100%",
    display: "flex",
    marginLeft: 30,
    height: 25,
  },
  img: {
    width: 25,
    height: 25,
  },
});
