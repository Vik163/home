import StatusInfo from "@/features/StatusInfo/StatusInfo";
import { SwitchTheme } from "@/features/switchTheme/SwitchTheme";
import { StateHomeTopics, statusTopic } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeTopic,
} from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics } from "@/shared/types/topics";
import { AnimatedText } from "@/shared/ui/AnimatedText/AnimatedText";
import { Collapsible } from "@/shared/ui/Collapsible/Collapsible";
import { ExternalLink } from "@/shared/ui/ExternalLink/ExternalLink";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect } from "react";
import { Button, StyleSheet, Text } from "react-native";
import * as UI from "shared/ui";

export default function MainPage() {
  const [status, setStatus] = React.useState("Нет связи с брокером");
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  useEffect(() => {
    if (brokerConnected()) mqttSubscribeTopic(statusTopic);
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
      setStatus(value);
    }
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <StatusInfo value={status} stylesStatus={styles.status} />
      <Text>{"Home"}</Text>

      <Button title={"Main"} onPress={() => router.navigate("/")} />
      <Collapsible title="Title" />
      <ExternalLink
        href={"https://dzen.ru/a/Y7mFGVuhMh8HuwKL"}
        style={{ backgroundColor: "#55ffff" }}
      />
      <AnimatedText />
      <SwitchTheme />
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
