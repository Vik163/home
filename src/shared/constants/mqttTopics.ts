export const allTopics = "home/#";
export const statusTopic = "home/status";
export const statusMainTopic = "home/manage";
export const stateHomeGroupTopics = "home/#";
export const lightTopic = "home/light";
export const lightStatusTopic = "home/light-status";
export const timerTopic = "home/timer";
export const timerStatusTopic = "home/timer-status";

export enum StateHomeTopics {
  TEMP = "temperature",
  HUMD = "humidity",
  VOLT = "voltage",
  CURRENT = "current",
  POWER = "power",
  FREQUENCY = "frequency",
  ENERGY = "energy",
  PF = "pf",
  AVERAGE = "average",
  THRESHOLD = "threshold",
  MAX = "max",
  MIN = "min",
  STATUS = "status",
  STATUS_MAIN = "manage",
  LIGHT = "light",
  LIGHT_STATUS = "light-status",
  TIMER = "timer",
  TIMER_STATUS = "timer-status",
}

export const topicsMain = [
  statusTopic,
  lightTopic,
  timerTopic,
  timerStatusTopic,
  lightStatusTopic,
  statusMainTopic,
];
