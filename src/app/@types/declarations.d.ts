declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.jpg" {
  const content: number;
  export default content;
}

declare module "*.png" {
  const content: number;
  export default content;
}
declare module "react_native_mqtt";

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_MQTT_USER: string;
    EXPO_PUBLIC_MQTT_USER_ID: string;
    EXPO_PUBLIC_MQTT_PASS: string;
    EXPO_PUBLIC_MQTT_SERVER: string;
    EXPO_PUBLIC_MQTT_PORT: number;
  }
}
