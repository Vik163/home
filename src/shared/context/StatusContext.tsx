import { createContext } from "react";
import { StatusState } from "../types/topics";

interface StatusProps {
  statusHome?: StatusState;
  setStatusHome?: (stat: StatusState) => void;
  statusMain?: StatusState;
  setStatusMain?: (stat: StatusState) => void;
}

export const StatusContext = createContext<StatusProps>({});
