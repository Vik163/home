import { Link, useRouter } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";

import StatusInfo from "@/features/StatusInfo/StatusInfo";
import { StateHomeTopics, statusTopic } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import {
  brokerConnected,
  client,
  mqttSubscribeTopic,
} from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { HomeStateTopics, StatusState } from "@/shared/types/topics";
import { Font } from "@/shared/ui";
import Loader from "@/shared/ui/Loader/Loader";
import { useEffect, useState } from "react";

export default function ModalScreen() {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusState>("offline");
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  async function getAuth() {
    setLoading(true);

    fetch("https://photosalon.online/api/ard/auth", {
      method: "POST",
      headers: {
        Authorization: process.env.EXPO_PUBLIC_ARD_JWT_SECRET!,
      },
      body: pass,
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data: { auth: boolean }) => {
        if (data.auth) {
          router.navigate("/main");
        } else {
          setPass("");
          setError("Не попал!");
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    if (brokerConnected()) mqttSubscribeTopic(statusTopic);
  }, [brokerConnected()]);

  function onSubmit() {
    getAuth();
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
    }
  }

  client.onMessageArrived = onMessageArrived;

  return (
    <View style={styles.container}>
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
      {error && <Font style={styles.error}>{error}</Font>}
      <Link href="/" dismissTo style={styles.link}>
        Вернуться на главную
      </Link>
      {loading && <Loader />}
    </View>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: 50,
      padding: 20,
      position: "relative",
      backgroundColor: theme.colors.background,
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
    error: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: 5,
      color: theme.colors.error,
    },
  });
};
