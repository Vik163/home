import { AnimatedText } from "@/shared/ui/AnimatedText/AnimatedText";
import { Collapsible } from "@/shared/ui/Collapsible/Collapsible";
import { ExternalLink } from "@/shared/ui/ExternalLink/ExternalLink";
import { StyleSheet, Text } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  return (
    <UI.Container>
      <Text>{"Добро пожаловать"}</Text>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
