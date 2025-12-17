import { FontFamily, FontSizes } from "@/shared/constants/fonts";
import { lightTopic, timerTopic } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import { sendMessageId } from "@/shared/lib/mqttBroker";
import { ArduinoData, SwitchStatus } from "@/shared/types/arduino";
import { Theme } from "@/shared/types/theme";
import { Button, Font } from "@/shared/ui";
import ModalUI from "@/shared/ui/ModalUI/ModalUI";
import * as React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { TimerModal } from "../TimerModal/TimerModal";

interface SwitchWithTimerProps {
  isTimer: boolean;
  isOutdoorLight: SwitchStatus;
  data?: ArduinoData;
  updateData: (time: string) => void;
}

export default function SwitchWithTimer(props: SwitchWithTimerProps) {
  const { isTimer, isOutdoorLight, data, updateData } = props;

  const { styles, theme } = useStyles(createStyles());

  const [isLoadingLight, setIsLoadingLight] = useState(false);
  const [isLoadingTimer, setIsLoadingTimer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lenData, setLenData] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const arrLen = data?.timerOutLight?.length!;
    setLenData(arrLen);
  }, [data]);

  useEffect(() => {
    setIsLoadingTimer(false);
    updateData(time);
    setTime("");
  }, [isTimer]);

  useEffect(() => {
    setIsLoadingLight(false);
  }, [isOutdoorLight]);

  function onLight() {
    sendMessageId(lightTopic, "1");
    setIsLoadingLight(true);
  }
  function offLight() {
    sendMessageId(lightTopic, "0");
    setIsLoadingLight(true);
  }

  function onSubmit() {
    if (time && time.length === 11) {
      sendMessageId(timerTopic, time);
      setIsLoadingTimer(true);
    }
  }

  function closeModal() {
    setModalVisible(false);
    setTime("");
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
        {isLoadingLight ? (
          <ActivityIndicator size={45} color={theme.colors.link} />
        ) : (
          <Button
            stylesBtn={styles.timer}
            fontSize={35}
            title={lenData > 0 ? "⏰" : "🕒"}
            onPress={() => setModalVisible(!modalVisible)}
          />
        )}
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
      {modalVisible && (
        <ModalUI
          title="Установить время"
          width={300}
          closeModal={() => closeModal()}
          onSubmit={onSubmit}
          modalVisible={modalVisible}
        >
          <TimerModal
            isLoadingTimer={isLoadingTimer}
            time={time}
            setTime={(time) => setTime(time)}
            dtimes={data?.timerOutLight}
            setIsLoadingTimer={setIsLoadingTimer}
          />
        </ModalUI>
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
      borderRadius: 6,
    },
  });
};
