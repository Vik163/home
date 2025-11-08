import { client } from "@/shared/lib/mqttBroker";
import { IndicationModule } from "@/shared/ui/IndicationModule/IndicationModule";
import { StyleSheet } from "react-native";

import * as UI from "shared/ui";

export default function RootPage() {
  function onConnect() {
    console.log("onConnect");
  }

  function onConnectionLost(responseObject: {
    errorCode: number;
    errorMessage: string;
  }) {
    console.log("esponseObject.errorCode:", responseObject.errorCode);
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message: { payloadString: string }) {
    console.log("onMessageArrived:" + message.payloadString);
  }
  function onFailure(message: any) {
    console.log("onMessageArrived:" + message.errorMessage);
  }

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    onSuccess: onConnect,
    useSSL: true,
    userName: "user_e3bbfff5",
    password: "HVZj41dP31PZQ",
    onFailure,
  });

  function onConnectMqtt() {
    client.connect({
      onSuccess: onConnect,
      useSSL: true,
      userName: "user_e3bbfff5",
      password: "HVZj41dP31PZQ",
      onFailure,
      keepAliveInterval: 200,
      reconnect: true,
    });
  }

  console.log("client:", client.isConnected());

  return (
    <UI.Container addStyles={styles.container} bgImage>
      <IndicationModule title="Температура в доме" />
      <IndicationModule title="Напряжение" />
      <IndicationModule title="Сила тока" />
      <IndicationModule title="Частота" />
      <IndicationModule title="Мощность" />
      <IndicationModule title="Энергия" />
      <UI.TextButton title={"Обновить"} fontSize={20} onPress={onConnectMqtt} />
    </UI.Container>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
