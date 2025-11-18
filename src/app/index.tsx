import internet from "@/shared/assets/images/internet.png";
import link from "@/shared/assets/images/link.png";
import { StateHomeTopics } from "@/shared/constants/mqttTopics";
import { useNavigationActions } from "@/shared/hooks/useNavigationActions";
import { useStyles } from "@/shared/hooks/useStyles";
import { brokerConnected, client } from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics } from "@/shared/types/topics";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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

  const { goToLogin } = useNavigationActions();
  // useEffectMount(() => mqttConnect(stateHomeGroupTopics), []);

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

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <View style={styles.status}>
        {status !== "Связь установлена" ? (
          <Text style={styles.statusText}>{status}</Text>
        ) : (
          <Image style={styles.img} source={internet} />
        )}
        <UI.Button
          stylesBtn={styles.link}
          icon={link}
          sizeIcon={20}
          onPress={() => goToLogin()}
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

      {status !== "Связь установлена" && (
        <UI.Button
          stylesBtn={styles.btn}
          title={"Установить соединение"}
          fontSize={16}
          icon={internet}
          sizeIcon={20}
          // onPress={() => mqttConnect(stateHomeGroupTopics)}
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
    statusText: {
      textAlign: "center",
      color: theme.colors.error,
    },
    img: {
      width: 25,
      height: 25,
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
