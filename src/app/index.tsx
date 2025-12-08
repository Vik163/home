import StatusInfo from "@/features/StatusInfo/StatusInfo";
import internet from "@/shared/assets/images/internet.png";
import link from "@/shared/assets/images/link.png";
import { FontFamily } from "@/shared/constants/fonts";
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
  const { styles } = useStyles(createStyles());

  // console.log("theme:", theme);
  const router = useRouter();

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
        setTemp(value.slice(0, -1));
        break;
      case StateHomeTopics.HUMD:
        setHumd(value.slice(0, -3));
        break;
      case StateHomeTopics.VOLT:
        setVolt(value.slice(0, -3));
        break;
      case StateHomeTopics.CURRENT:
        setCurrent(value.slice(0, -1));
        break;
      case StateHomeTopics.FREQUENCY:
        setFrequency(Math.round(+value).toString());
        break;
      case StateHomeTopics.POWER:
        setPower((+value.slice(0, -3) / 1000).toString().slice(0, 4));
        break;
      case StateHomeTopics.ENERGY:
        setEnergy(value.slice(0, -3));
        break;
      case StateHomeTopics.PF:
        setPf(value.slice(0, -1));
        break;
      case StateHomeTopics.AVERAGE:
        setAverage(value.slice(0, -3));
        break;
      case StateHomeTopics.THRESHOLD:
        setThreshold(value.slice(0, -3));
        break;
      case StateHomeTopics.MAX:
        setMax(value.slice(0, -3));
        break;
      case StateHomeTopics.MIN:
        setMin(value.slice(0, -3));
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
      <UI.Font max alignCenter size={16} family={FontFamily.SOFIA}>
        Статистика за сутки
      </UI.Font>
      <IndicationModule title="U min" value={min} />
      <IndicationModule title="U max" value={max} />
      <IndicationModule title="U среднее" value={average} />
      <IndicationModule title="U < 190 мин" value={threshold} />

      <UI.Button
        stylesBtn={styles.btn}
        title={
          !brokerConnected() ? "Установить соединение" : "Обновить статистику"
        }
        fontSize={16}
        icon={internet}
        sizeIcon={!brokerConnected() ? 20 : 0}
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
      rowGap: 15,
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
