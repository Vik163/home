import { useNavigationActions } from "@/shared/hooks/useNavigationActions";
import { AnimatedText } from "@/shared/ui/AnimatedText/AnimatedText";
import { Collapsible } from "@/shared/ui/Collapsible/Collapsible";
import { ExternalLink } from "@/shared/ui/ExternalLink/ExternalLink";
import * as React from "react";
import { Button, StyleSheet, Text } from "react-native";
import * as UI from "shared/ui";

export default function MainPage() {
  const { goToLogin } = useNavigationActions();

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <Text>{"Home"}</Text>

      <Button
        title={"Login"}
        onPress={() => {
          goToLogin();
        }}
      />
      <Collapsible title="Title" />
      <ExternalLink
        href={"https://dzen.ru/a/Y7mFGVuhMh8HuwKL"}
        style={{ backgroundColor: "#55ffff" }}
      />
      <AnimatedText />
    </UI.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
