import internet from "@/shared/assets/images/internet.png";
import { StatusContext } from "@/shared/context/StatusContext";
import { useStyles } from "@/shared/hooks/useStyles";
import { brokerConnected } from "@/shared/lib/mqttBroker";
import { Theme } from "@/shared/types/theme";
import { useContext, useEffect, useState } from "react";
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
  stylesStatus?: Styles;
  page: "index" | "main";
}) {
  const { stylesStatus, page } = props;
  const [statusText, setStatusText] = useState("Нет связи с брокером");
  const { styles, theme } = useStyles(createStyles(stylesStatus));
  const { statusHome, statusMain } = useContext(StatusContext);

  useEffect(() => {
    if (!brokerConnected()) {
      setStatusText("Нет связи с брокером");
    }
    if (page === "index") {
      if (brokerConnected() && statusHome === "offline")
        setStatusText("Нет связи с домом");
      if (brokerConnected() && statusHome === "online")
        setStatusText("Связь установлена");
    } else {
      if (brokerConnected() && statusMain === "offline")
        setStatusText("Нет связи с домом");
      if (brokerConnected() && statusMain === "online")
        setStatusText("Связь установлена");
    }
  }, [statusMain, statusHome]);

  return (
    <View style={styles.status as StyleProp<ViewStyle>}>
      {statusText !== "Связь установлена" ? (
        <Text style={styles.statusText}>{statusText}</Text>
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
