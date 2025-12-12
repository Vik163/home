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
  | "timer"
  | "status";

export type StatusState = "online" | "offline";
