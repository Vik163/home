export type HomeStateTopics =
  | "temperature"
  | "humidity"
  | "voltage"
  | "current"
  | "power"
  | "frequency"
  | "energy"
  | "pf"
  | "max"
  | "min"
  | "threshold"
  | "average"
  | "light"
  | "status";

export type StatusState = "online" | "offline";
