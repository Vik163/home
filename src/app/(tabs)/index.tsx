import { StyleSheet, Text } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  return (
    <UI.Container>
      <Text>{"Добро пожаловать"}</Text>
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
