import StatusInfo from "@/features/StatusInfo/StatusInfo";
import SwitchWithTimer from "@/features/SwitchWithTimer/SwitchWithTimer";
import {
  StateHomeTopics,
  lightStatusTopic,
  lightTopic,
  statusTopic,
  timerStatusTopic,
  timerTopic,
} from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeTopic,
} from "@/shared/lib/mqttBroker";
import { ArduinoData, SwitchStatus } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import { AnimatedText } from "@/shared/ui/AnimatedText/AnimatedText";
import { ExternalLink } from "@/shared/ui/ExternalLink/ExternalLink";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import * as UI from "shared/ui";

export default function MainPage() {
  const [status, setStatus] = useState<StatusState>("offline");
  const [data, setData] = useState<ArduinoData>();
  const [isOutdoorLight, setIsOutdoorLight] = useState<SwitchStatus>("0");
  const [isTimer, setIsTimer] = useState(false);
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  function getData() {
    fetch("http://192.168.0.17/api/ard")
      .then(async (res) => {
        return await res.json();
      })
      .then((data: ArduinoData) => {
        if (data) setData(data);
      });
  }

  function updateData(time: string) {
    let arrTimes = data?.timerOutLight!;
    if (arrTimes?.some((t) => t === time)) {
      arrTimes = arrTimes.filter((t) => t !== time);
    } else arrTimes?.push(time);

    if (data?.timerOutLight) setData({ ...data, timerOutLight: arrTimes });
  }

  useEffect(() => {
    getData();

    if (brokerConnected()) {
      mqttSubscribeTopic(statusTopic);
      mqttSubscribeTopic(lightTopic);
      mqttSubscribeTopic(timerTopic);
      mqttSubscribeTopic(timerStatusTopic);
      mqttSubscribeTopic(lightStatusTopic);
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
    if (key === StateHomeTopics.STATUS) {
      setStatus(value as StatusState);
    } else if (key === StateHomeTopics.TIMER_STATUS) {
      setIsTimer(!isTimer);
    } else if (key === StateHomeTopics.LIGHT_STATUS) {
      const val = value as SwitchStatus;
      setIsOutdoorLight(val);
    }
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <StatusInfo value={status} stylesStatus={styles.status} />
      <SwitchWithTimer
        updateData={updateData}
        isOutdoorLight={isOutdoorLight}
        isTimer={isTimer}
        data={data}
      />

      <Button title={"Main"} onPress={() => router.navigate("/")} />

      <ExternalLink
        href={"https://dzen.ru/a/Y7mFGVuhMh8HuwKL"}
        style={{ backgroundColor: "#55ffff" }}
      />
      <AnimatedText />
    </UI.Container>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 60,
      padding: 20,
      paddingTop: 60,
    },
    status: {
      position: "absolute",
      top: 10,
      left: 40,
      height: 28,
    },
    link: {
      color: theme.colors.link,
    },
    input: {
      textAlign: "center",
      fontSize: 40,
      fontWeight: 500,
      letterSpacing: 5,
      color: theme.colors.text,
    },
  });
};
