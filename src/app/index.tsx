import StatusInfo from "@/features/StatusInfo/StatusInfo";
import internet from "@/shared/assets/images/internet.png";
import link from "@/shared/assets/images/link.png";
import {
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
} from "@/shared/lib/mqttBroker";
import { ArduinoData } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as UI from "shared/ui";

export default function RootPage() {
  const [temp, setTemp] = useState("0.0");
  const [humd, setHumd] = useState("0.0");
  const [volt, setVolt] = useState("0.0");
  const [current, setCurrent] = useState("0.0");
  const [frequency, setFrequency] = useState("0.0");
  const [power, setPower] = useState("0.0");
  const [energy, setEnergy] = useState("0.0");
  const [pf, setPf] = useState("0.0");
  const [max, setMax] = useState("0");
  const [min, setMin] = useState("0");
  const [threshold, setThreshold] = useState("0");
  const [average, setAverage] = useState("0.0");
  const [status, setStatus] = useState<StatusState>("offline");
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  function removeLastNum(num: string, k: number) {
    return num.slice(0, -k);
  }

  async function getStatData() {
    fetch("https://photosalon.online/api/ard")
      .then(async (res) => {
        return await res.json();
      })
      .then((data: ArduinoData) => {
        const min = Math.min(...data.min);
        setMin(min.toString());

        const max = Math.max(...data.max);
        setMax(max.toString());

        const sum = data.avr.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const avr = (sum / data.avr.length).toString();
        setAverage(avr.slice(0, 3));

        const sumThd = data.thd.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const minutes = ((sumThd * 5) / 60).toString();
        setThreshold(minutes.slice(0, 3));
      });
  }

  useEffectMount(() => {
    if (!client.isConnected()) mqttConnect(stateHomeGroupTopics);
  }, []);

  useEffect(() => {
    if (brokerConnected()) {
      mqttSubscribeTopic(statusTopic);
    }

    getStatData();
  }, [brokerConnected()]);

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
        setTemp(removeLastNum(value, 1));
        break;
      case StateHomeTopics.HUMD:
        setHumd(removeLastNum(value, 3));
        break;
      case StateHomeTopics.VOLT:
        setVolt(removeLastNum(value, 3));
        break;
      case StateHomeTopics.CURRENT:
        setCurrent(removeLastNum(value, 1));
        break;
      case StateHomeTopics.FREQUENCY:
        setFrequency(Math.floor(+value).toString());
        break;
      case StateHomeTopics.POWER:
        setPower((+removeLastNum(value, 3) / 1000).toString().slice(0, 4));
        break;
      case StateHomeTopics.ENERGY:
        setEnergy(removeLastNum(value, 1));
        break;
      case StateHomeTopics.PF:
        setPf(removeLastNum(value, 1));
        break;
      case StateHomeTopics.AVERAGE:
        setAverage(removeLastNum(value, 3));
        break;
      case StateHomeTopics.THRESHOLD:
        setThreshold(removeLastNum(value, 3));
        break;
      case StateHomeTopics.MAX:
        setMax(removeLastNum(value, 3));
        break;
      case StateHomeTopics.MIN:
        setMin(removeLastNum(value, 3));
        break;
      case StateHomeTopics.STATUS:
        setStatus(value as StatusState);
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
      <IndicationModule title="Температура °C" value={temp} />
      <IndicationModule title="Влажность %" value={humd} />
      <IndicationModule title="Напряжение V" value={volt} />
      <IndicationModule title="Сила тока A" value={current} />
      <IndicationModule title="Частота Hz" value={frequency} />
      <IndicationModule title="Мощность kW" value={power} />
      <IndicationModule title="Энергия kW/h" value={energy} />
      <IndicationModule title="cos φ" value={pf} />
      <IndicationModule title="Min v/сутки" value={min} />
      <IndicationModule title="Max v/сутки" value={max} />
      <IndicationModule title="Avr v/сутки" value={average} />
      <IndicationModule title="V < 190 м/сутки" value={threshold} />

      <UI.Button
        stylesBtn={styles.btn}
        title={
          !brokerConnected() ? "Установить соединение" : "Обновить статистику"
        }
        fontSize={16}
        icon={internet}
        sizeIcon={20}
        onPress={
          !brokerConnected()
            ? () => mqttConnect(stateHomeGroupTopics)
            : () => getStatData()
        }
      />
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
