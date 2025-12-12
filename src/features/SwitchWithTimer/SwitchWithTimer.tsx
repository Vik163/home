import { FontFamily, FontSizes } from "@/shared/constants/fonts";
import { stateLight, stateTimer } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import { sendMessageId } from "@/shared/lib/mqttBroker";
import { ArduinoData, SwitchStatus } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { Button, Font } from "@/shared/ui";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SwitchWithTimerProps {
  isOutdoorLight: SwitchStatus;
}

export default function SwitchWithTimer(props: SwitchWithTimerProps) {
  const { isOutdoorLight } = props;
  const { styles, theme } = useStyles(createStyles());

  function updateOutdoorLightData(value: SwitchStatus) {
    fetch("http://192.168.0.17/api/ard", {
      method: "POST",
      body: JSON.stringify({
        outdoorLight: value,
      }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data: ArduinoData) => {
        console.log("data:", data);
      });
  }

  function onLight() {
    sendMessageId(stateLight, "1");
  }
  function offLight() {
    console.log("i");
    sendMessageId(stateLight, "0");
  }
  function setTimer() {
    console.log("i");

    sendMessageId(stateTimer, "24.12:13.15");
  }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.titleContainer}>
          <Font family={FontFamily.SOFIA} size={FontSizes.MEDIUM}>
            {"Уличная подсветка"}
          </Font>
          <Text
            style={{
              color:
                isOutdoorLight === "1"
                  ? theme.colors.yellow
                  : theme.colors.border,
              letterSpacing: 3,
            }}
          >
            {"***************"}
          </Text>
        </View>
        <Button
          stylesBtn={styles.timer}
          fontSize={35}
          title={"🕒"}
          onPress={() => onLight()}
        />
      </View>
      {isOutdoorLight === "0" ? (
        <Button
          stylesBtn={styles.btn}
          title={"Включить"}
          onPress={() => onLight()}
        />
      ) : (
        <Button
          stylesBtn={styles.btn}
          title={"Выключить"}
          onPress={() => offLight()}
        />
      )}
    </View>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: 300,
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      gap: 15,
      padding: 10,
      paddingTop: 15,
    },
    titleContainer: {
      alignItems: "center",
      justifyContent: "space-between",
      gap: 7,
      height: 40,
    },
    timerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 30,
      height: 40,
    },
    timer: {
      width: 45,
      height: 35,
    },
    btn: {
      width: "100%",
      height: 30,
      color: theme.colors.link,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
    },
  });
};
