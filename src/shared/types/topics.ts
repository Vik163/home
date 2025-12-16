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
  | "timer-status"
  | "light-status"
  | "status";

export type StatusState = "online" | "offline";
