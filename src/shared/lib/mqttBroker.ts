import AsyncStorage from "@react-native-async-storage/async-storage";
import init from "react_native_mqtt";
import { loginTopic } from "../constants/mqttTopics";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const options = {
  host: process.env.EXPO_PUBLIC_MQTT_SERVER,
  port: +process.env.EXPO_PUBLIC_MQTT_PORT,
  path: "/home",
  id: process.env.EXPO_PUBLIC_MQTT_USER_ID,
};

//@ts-ignore
export const client = new Paho.MQTT.Client(
  options.host,
  options.port,
  options.path
);

client.onConnectionLost = onConnectionLost;

export function mqttSubscribeTopic(topic: string) {
  client.subscribe(topic, { qos: 1 });
}

function onConnect(topic: string) {
  console.log("onConnect");
  mqttSubscribeTopic(loginTopic);
  mqttSubscribeTopic(topic);
}

export function brokerConnected() {
  return client.isConnected();
}

function onFailure(message: any) {
  console.log("onMessageArrived:" + message.errorMessage);
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

const unSubscribeTopic = () => {
  // client.unsubscribe(subscribedTopic);
};

export const sendMessageId = (subscribedTopic: string, text: string) => {
  //@ts-ignore
  var message = new Paho.MQTT.Message(options.id + ":" + text);
  message.destinationName = subscribedTopic;
  client.send(message);
};

export const sendMessage = (subscribedTopic: string, text: string) => {
  //@ts-ignore
  var message = new Paho.MQTT.Message(text);
  message.destinationName = subscribedTopic;
  client.send(message);
};

export function mqttConnect(topic: string) {
  client.connect({
    onSuccess: () => onConnect(topic),
    useSSL: true,
    userName: process.env.EXPO_PUBLIC_MQTT_USER,
    password: process.env.EXPO_PUBLIC_MQTT_PASS,
    onFailure,
    keepAliveInterval: 200,
    reconnect: true,
  });
}
