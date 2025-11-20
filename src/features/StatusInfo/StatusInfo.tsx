import internet from "@/shared/assets/images/internet.png";
import { useStyles } from "@/shared/hooks/useStyles";
import { brokerConnected } from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { useEffect, useState } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Styles = ViewStyle | TextStyle | ImageStyle;

export default function StatusInfo(props: {
  value: string;
  stylesStatus?: Styles;
}) {
  const { value, stylesStatus } = props;
  const [status, setStatus] = useState("Нет связи с брокером");
  const { styles, theme } = useStyles(createStyles(stylesStatus));

  useEffect(() => {
    if (!brokerConnected()) {
      setStatus("Нет связи с брокером");
    }
    if (brokerConnected() && value === "offline")
      setStatus("Нет связи с домом");
    if (brokerConnected() && value === "online") setStatus("Связь установлена");
  }, [value]);

  return (
    <View style={styles.status as StyleProp<ViewStyle>}>
      {status !== "Связь установлена" ? (
        <Text style={styles.statusText}>{status}</Text>
      ) : (
        <Image style={styles.img} source={internet} />
      )}
    </View>
  );
}

const createStyles = (stylesStatus?: Styles) => (theme: Theme) => {
  const initialStyles = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return StyleSheet.create({
    status: { ...initialStyles, ...stylesStatus } as Styles,
    statusText: {
      textAlign: "center",
      color: theme.colors.error,
    },
    img: {
      width: 25,
      height: 25,
    },
  });
};
