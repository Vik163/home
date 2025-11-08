import { AsyncStorage } from "react-native-storage";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const options = {
  host: "srv2.clusterfly.ru",
  port: 9994,
  path: "home/status",
  id: "user_e3bbfff5_lamp",
};

export const client = new Paho.MQTT.Client(
  options.host,
  options.port,
  options.path
);
