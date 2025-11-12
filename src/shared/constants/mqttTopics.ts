export const allTopics = "home/#";
export const statusTopic = "home/status";
export const stateHomeGroupTopics = "home/state/#";
export const topics = {
  dht: ["home/DHT11/temperature", "home/DHT11/humidity"],
};

export enum StateHomeTopics {
  TEMP = "temperature",
  HUMD = "humidity",
  VOLT = "voltage",
  CURRENT = "current",
  POWER = "power",
  FREQUENCY = "frequency",
  ENERGY = "energy",
  PF = "pf",
  STATUS = "status",
}
