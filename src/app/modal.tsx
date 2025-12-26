import { Link, useRouter } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";

import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import { Font } from "@/shared/ui";
import Loader from "@/shared/ui/Loader/Loader";
import { useEffect, useState } from "react";

export default function ModalScreen() {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { styles, theme } = useStyles(createStyles());
  const router = useRouter();

  async function onAuth() {
    setLoading(true);

    fetch(`${process.env.EXPO_PUBLIC_HTTP_SERVER}/auth`, {
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
    if (pass.length === 4) onAuth();
  }, [pass]);

  return (
    <View style={styles.container}>
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
        onSubmitEditing={onAuth}
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
