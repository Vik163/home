import StatusInfo from "@/features/StatusInfo/StatusInfo";
import SwitchWithTimer from "@/features/SwitchWithTimer/SwitchWithTimer";
import {
  StateHomeTopics,
  stateLight,
  stateTimer,
  statusTopic,
} from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeTopic,
  sendMessageId,
} from "@/shared/lib/mqttBroker";
import { ArduinoData, SwitchStatus } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import { AnimatedText } from "@/shared/ui/AnimatedText/AnimatedText";
import { ExternalLink } from "@/shared/ui/ExternalLink/ExternalLink";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import * as UI from "shared/ui";

export default function MainPage() {
  const [status, setStatus] = useState<StatusState>("offline");
  const [isOutdoorLight, setIsOutdoorLight] = useState<SwitchStatus>("0");
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  function getData() {
    fetch("http://192.168.0.17/api/ard")
      .then(async (res) => {
        return await res.json();
      })
      .then((data: ArduinoData) => {
        console.log("data:", data);
      });
  }

  function updateOutdoorLightData(value: SwitchStatus) {
    fetch("http://192.168.0.17/api/ard", {
      method: "POST",
      body: JSON.stringify({
        outdoorLight: value,
      }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data: ArduinoData) => {
        console.log("data:", data);
      });
  }

  useEffect(() => {
    getData();

    if (brokerConnected()) {
      mqttSubscribeTopic(statusTopic);
      mqttSubscribeTopic(stateLight);
      mqttSubscribeTopic(stateTimer);
    }

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
      } else if (key === StateHomeTopics.LIGHT) {
        const val = value as SwitchStatus;
        setIsOutdoorLight(val);
      } else if (key === StateHomeTopics.TIMER) {
        // setIsLight(value as "0" | "1");
        console.log("i", value);
      }
    }

    client.onMessageArrived = onMessageArrived;
  }, [brokerConnected()]);

  function setTimer() {
    console.log("i");

    sendMessageId(stateTimer, "24.12:13.15");
  }

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <StatusInfo value={status} stylesStatus={styles.status} />
      <Text>{"Home"}</Text>
      <SwitchWithTimer isOutdoorLight={isOutdoorLight} />

      <Button title={"Main"} onPress={() => router.navigate("/")} />
      <Button title={"Timer"} onPress={() => setTimer()} />

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
      justifyContent: "center",
      gap: 60,
      padding: 20,
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
