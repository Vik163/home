import { useNavigationActions } from "@/shared/hooks/useNavigationActions";
import * as React from "react";
import { Button, Text } from "react-native";
import * as UI from "shared/ui";

export default function MainPage() {
  const { goToPush, goToLogin } = useNavigationActions();

  return (
    <UI.Container>
      <Text>{"Home"}</Text>
      <Button
        title={"Push"}
        onPress={() => {
          goToPush();
        }}
      />
      <Button
        title={"Login"}
        onPress={() => {
          goToLogin();
        }}
      />
    </UI.Container>
  );
}
