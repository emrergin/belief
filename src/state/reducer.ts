import { State } from "./state";
import { Phase } from "./types";

export type Action =
  | {
      type: "SET_PHASE";
      payload: Phase;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PHASE":
      return {
        ...state,
        phase: action.payload,
      };
    default:
      return state;
  }
};

export const setPhase = (phase: Phase): Action => {
  return {
    type: "SET_PHASE",
    payload: phase,
  };
};
