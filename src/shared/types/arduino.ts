export type SwitchStatus = "0" | "1";

export interface ArduinoData {
  id: string;
  min: number[];
  max: number[];
  avr: number[];
  thd: number[];
  timerOutLight?: string[];
  outLight: SwitchStatus;
}
