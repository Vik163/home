import StatusInfo from "@/features/StatusInfo/StatusInfo";
import internet from "@/shared/assets/images/internet.png";
import link from "@/shared/assets/images/link.png";
import {
  loginTopic,
  stateHomeGroupTopics,
  StateHomeTopics,
  statusTopic,
} from "@/shared/constants/mqttTopics";
import { useEffectMount } from "@/shared/hooks/useEffectMount";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttConnect,
  mqttSubscribeTopic,
  sendMessage,
} from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics } from "@/shared/types/topics";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
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
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  useEffectMount(() => {
    if (!client.isConnected()) mqttConnect(stateHomeGroupTopics);
  }, []);

  useEffect(() => {
    if (brokerConnected()) {
      mqttSubscribeTopic(statusTopic);
      sendMessage(loginTopic, "no");
    }
  }, [brokerConnected()]);

  async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString;
    const key = message.destinationName
      .split("/")
      .slice(-1)[0] as HomeStateTopics;

    function removeLastNum(num: string) {
      return num.slice(0, -1);
    }

    switch (key) {
      case StateHomeTopics.TEMP:
        setTemp(removeLastNum(value));
        break;
      case StateHomeTopics.HUMD:
        setHumd(removeLastNum(value));
        break;
      case StateHomeTopics.VOLT:
        setVolt(removeLastNum(value));
        break;
      case StateHomeTopics.CURRENT:
        setCurrent(removeLastNum(value));
        break;
      case StateHomeTopics.FREQUENCY:
        setFrequency(removeLastNum(value));
        break;
      case StateHomeTopics.POWER:
        setPower(removeLastNum(value));
        break;
      case StateHomeTopics.ENERGY:
        setEnergy(removeLastNum(value));
        break;
      case StateHomeTopics.PF:
        setPf(removeLastNum(value));
        break;
      case StateHomeTopics.AVERAGE:
        setAverage(removeLastNum(value));
        break;
      case StateHomeTopics.THRESHOLD:
        setThreshold(removeLastNum(value));
        break;
      case StateHomeTopics.MAX:
        setMax(removeLastNum(value));
        break;
      case StateHomeTopics.MIN:
        setMin(removeLastNum(value));
        break;
      case StateHomeTopics.STATUS:
        setStatus(value);
        break;

      default:
        console.log("Error:");
    }
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <View style={styles.status}>
        <StatusInfo value={status} />
        <UI.Button
          stylesBtn={styles.link}
          icon={link}
          sizeIcon={20}
          onPress={() => router.navigate("/modal")}
        />
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

      {status !== "online" && (
        <UI.Button
          stylesBtn={styles.btn}
          title={"Установить соединение"}
          fontSize={16}
          icon={internet}
          sizeIcon={20}
          onPress={() => mqttConnect(stateHomeGroupTopics)}
        />
      )}
    </UI.Container>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      rowGap: 18,
      columnGap: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    status: {
      width: "90%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginTop: 5,
      height: 28,
    },
    link: {
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      width: 40,
    },

    btn: {
      marginTop: 5,
      gap: 10,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      width: "90%",
      height: 35,
    },
  });
};
