import { Link, useRouter } from "expo-router";
import { StyleSheet, TextInput } from "react-native";

import StatusInfo from "@/features/StatusInfo/StatusInfo";
import { StateHomeTopics, statusTopic } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeTopic,
} from "@/shared/lib/mqttBroker";
import { ThemedView } from "@/shared/lib/themed-view";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import Loader from "@/shared/ui/Loader/Loader";
import { useEffect, useState } from "react";

export default function ModalScreen() {
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>("offline");
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  useEffect(() => {
    if (brokerConnected()) mqttSubscribeTopic(statusTopic);
  }, [brokerConnected()]);

  function onSubmit() {
    // sendMessageId(loginTopic, pass);
    setLoading(true);
  }

  async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString;
    const key = message.destinationName
      .split("/")
      .slice(-1)[0] as HomeStateTopics;
    // if (key === StateHomeTopics.LOGIN && value === "yes") {
    //   router.navigate("/main");
    // }
    if (key === StateHomeTopics.STATUS) {
      setStatus(value as StatusState);
    }
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <ThemedView style={styles.container}>
      <StatusInfo value={status} stylesStatus={styles.status} />
      <TextInput
        secureTextEntry
        autoFocus
        placeholder="🔒"
        caretHidden
        maxLength={6}
        keyboardType="numeric"
        value={pass}
        onChangeText={(data) => setPass(data)}
        style={styles.input}
        onSubmitEditing={onSubmit}
      />
      <Link href="/" dismissTo style={styles.link}>
        Вернуться на главную
      </Link>
      {loading && <Loader />}
    </ThemedView>
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
      position: "relative",
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
