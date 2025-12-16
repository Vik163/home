import { timerTopic } from "@/shared/constants/mqttTopics";
import { useStyles } from "@/shared/hooks/useStyles";
import { sendMessageId } from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

interface TimeEditorProps {
  time: string;
  setIsLoadingTimer: React.Dispatch<React.SetStateAction<boolean>>;
  updateData: (time: string) => void;
}

export default function TimeEditor(props: TimeEditorProps) {
  const { time, setIsLoadingTimer, updateData } = props;
  const { styles, theme } = useStyles(createStyles());

  function deleteTime(time: string) {
    sendMessageId(timerTopic, time);
    setIsLoadingTimer(true);
    updateData(time);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{time}</Text>
      <Ionicons
        style={styles.basket}
        name="close"
        size={25}
        color={theme.colors.border}
        onPress={() => deleteTime(time)}
      />
      {/* <Button
        stylesBtn={styles.basket}
        fontSize={20}
        title={"✖️"}
        onPress={() => deleteTime(time)}
      /> */}
    </View>
  );
}

const createStyles = () => (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: 35,
      padding: 5,
    },
    basket: {
      width: 30,
      height: 25,
    },
    text: {
      textAlign: "center",
      fontSize: 20,
      color: theme.colors.yellow,
    },
  });
};
