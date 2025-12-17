import { useStyles } from "@/shared/hooks/useStyles";
import { Theme } from "@/shared/types/theme";
import * as React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TimeEditor from "./TimeEditor";

interface TimerModalProps {
  time: string;
  setTime: (value: React.SetStateAction<string>) => void;
  setIsLoadingTimer: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingTimer: boolean;
  dtimes?: string[];
}

export const TimerModal = (props: TimerModalProps) => {
  const { time, setTime, isLoadingTimer, dtimes, setIsLoadingTimer } = props;
  const { styles, theme } = useStyles(createStyles());

  function handleData(value: string) {
    const len = value.length;
    if (len === 3 || len === 9) {
      setTime(`${time}.${value.slice(-1)}`);
    } else if (len === 6) {
      setTime(`${time}-${value.slice(-1)}`);
    } else setTime(value);
  }

  function updateData(value: string) {
    setTime(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {dtimes &&
          dtimes.map((time) => (
            <TimeEditor
              setIsLoadingTimer={setIsLoadingTimer}
              key={time}
              time={time}
              updateData={updateData}
            />
          ))}
        <Text style={styles.text}>00.00-00.00</Text>
        {isLoadingTimer ? (
          <ActivityIndicator size={45} color={theme.colors.link} />
        ) : (
          !dtimes ||
          (dtimes?.length! < 2 && (
            <TextInput
              style={styles.input}
              // autoFocus
              placeholder="-- --"
              // caretHidden
              maxLength={11}
              keyboardType="numeric"
              value={time}
              onChangeText={(data) => handleData(data)}
            />
          ))
        )}
      </View>
    </View>
  );
};

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 10,
      gap: 15,
      padding: 10,
    },
    inputContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 5,
    },
    input: {
      textAlign: "center",
      fontSize: 20,
      // lineHeight: 20,
      fontWeight: 500,
      letterSpacing: 1,
      color: theme.colors.yellow,
      width: "60%",
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 6,
      padding: 5,
    },
    text: {
      width: "100%",
      textAlign: "center",
      color: theme.colors.link,
    },
  });
};
