import StatusInfo from "@/features/StatusInfo/StatusInfo";
import SwitchWithTimer from "@/features/SwitchWithTimer/SwitchWithTimer";
import { StateHomeTopics, topicsMain } from "@/shared/constants/mqttTopics";
import { StatusContext } from "@/shared/context/StatusContext";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeArrTopics,
} from "@/shared/lib/mqttBroker";
import { ArduinoData, SwitchStatus } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as UI from "shared/ui";
import { Button } from "shared/ui";

export default function MainPage() {
  const [data, setData] = useState<ArduinoData>();
  const [isOutdoorLight, setIsOutdoorLight] = useState<SwitchStatus>("0");
  const [isConnected, setIsConnected] = useState(brokerConnected());
  const [isTimer, setIsTimer] = useState(false);
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();
  const { setStatusMain } = React.useContext(StatusContext);

  function getData() {
    fetch(process.env.EXPO_PUBLIC_HTTP_SERVER)
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

  if (isConnected !== brokerConnected()) {
    setIsConnected(brokerConnected());
  }

  useEffect(() => {
    getData();

    if (isConnected) {
      mqttSubscribeArrTopics(topicsMain);
    }
  }, [isConnected]);

  async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString;
    const key = message.destinationName
      .split("/")
      .slice(-1)[0] as HomeStateTopics;
    if (key === StateHomeTopics.STATUS_MAIN) {
      if (setStatusMain) setStatusMain(value as StatusState);
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
      <StatusInfo stylesStatus={styles.status} page="main" />
      <SwitchWithTimer
        updateData={updateData}
        isOutdoorLight={isOutdoorLight}
        isTimer={isTimer}
        data={data}
      />

      <Button
        stylesBtn={styles.link}
        title={"На главную"}
        onPress={() => router.navigate("/")}
      />

      {/* <ExternalLink
        href={"https://photosalon.online"}
        style={{ backgroundColor: "#55ffff" }}
      /> */}
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
      left: 60,
      height: 28,
    },
    link: {
      position: "absolute",
      bottom: 70,
      color: theme.colors.link,
    },
  });
};
