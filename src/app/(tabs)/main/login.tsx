import { SwitchTheme } from "@/features/switchTheme/SwitchTheme";
import { useNavigationActions } from "@/shared/hooks/useNavigationActions";
import { Link } from "expo-router";
import React from "react";
import { Button, StyleSheet } from "react-native";
import * as UI from "shared/ui";

const Login = () => {
  const { goToPush, goToMain } = useNavigationActions();

  return (
    <UI.Container>
      <Button
        title={"push"}
        onPress={() => {
          goToPush();
        }}
      />
      <Button
        title={"main"}
        onPress={() => {
          goToMain();
        }}
      />
      <Link href="/modal" style={styles.link}>
        Open modal
      </Link>
      <SwitchTheme />
    </UI.Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});

export default Login;
